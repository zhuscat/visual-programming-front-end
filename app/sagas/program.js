import { take, put, call, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { api, history } from '../services';
import * as programActions from '../actions/program';

function procedureNodeTransform(value, target, nameMap) {
  if (('first' in value) && ('firstType' in value) && value.firstType === 'VAR') {
    // reassign...but simple
    value.first = nameMap[value.first];
  }
  if (('second' in value) && ('secondType' in value) && value.secondType === 'VAR') {
    value.secondType = nameMap[value.secondType];
  }
  if (value.assign) {
    value.assign = nameMap[value.assign];
  }
  if (value.condition) {
    value.condition.forEach(v => {
      procedureNodeTransform(v, target, nameMap);
    });
  }
  if (value.procedure) {
    value.procedure.forEach(v => {
      procedureNodeTransform(v, target, nameMap);
    });
  }
  const condition = [];
  const procedure = [];
  if (value.condition) {
    value.condition.forEach(v => {
      condition.push(v.id);
    });
    value.condition = condition;
  }
  if (value.procedure) {
    value.procedure.forEach(v => {
      procedure.push(v.id);
    });
    value.procedure = procedure;
  }
  target.entities[value.id] = value;
}

function responseTransform(response) {
  const { programId, username, name, structInfo } = response;
  const json = JSON.stringify(structInfo);
  const nameMap = {};
  const target = {
    entities: {},
    variableArea: [],
    procedureArea: [],
  };
  json.variableArea.forEach(value => {
    target.entities[value.id] = value;
    target.variableArea.push(value.id);
    // 产生一个变量的 name 与 id 的映射表，方面下面查询
    nameMap[value.name] = value.id;
  });
  /**
   * 值得注意的一些事情
   * 1. 在 procedureArea 中，返回的数据中的操作符是名称，由 type 指定是变量还是直接量
   *    因此在处理数据的时候，需要将 firstType 和 secondType 的值转换成 ID
   * 2. 在 if 和 while 模块中包含 condition 和 procedure 模块
   *    对其进行递归
   */
  json.procedureArea.forEach(value => {
    procedureNodeTransform(value);
    target.procedureArea.push(value.id);
  });
  return target;
}

export function* runFetchProgram({ id }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.fetchProgram, id, token);
  if (response) {
    // 对 response 进行操作
    const { entities, variableArea, procedureArea } = responseTransform(response);
    yield put(programActions.fetchProgram.success({
      id,
      entities,
      variableArea,
      procedureArea,
    }, response));
  } else {
    yield put(programActions.fetchProgram.failure({ id }, error));
  }
}

export function* runFetchAllProgram() {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.fetchAllPrograms, token);
  if (response) {
    yield put(programActions.fetchAllPrograms.success({ id }, response));
  } else {
    yield put(programActions.fetchAllPrograms.failure({ id }, error));
  }
}

export function* runAddProgram({ program }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.addProgram, program, token);
  if (response) {
    yield put(programActions.addProgram.success({ program }, response));
  } else {
    yield put(programActions.addProgram.failure({ program }, error));
  }
}

export function* runUpdateProgram({ program }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.updateProgram, program, token);
  if (response) {
    yield put(programActions.updateProgram.success({ program }, response));
  } else {
    yield put(programActions.updateProgram.failure({ program }, error));
  }
}

export function* fetchProgram() {
  yield* takeEvery(programActions.FETCH_PROGRAM.REQUEST, runFetchProgram);
}

export function* fetchAllPrograms() {
  yield* takeEvery(programActions.FETCH_ALL_PROGRAMS.REQUEST, runFetchAllProgram);
}

export function* addProgram() {
  yield* takeEvery(programActions.ADD_PROGRAM.REQUEST, runAddProgram);
}


export function* updateProgram() {
  yield* takeEvery(programActions.UPDATE_PROGRAM.REQUEST, runUpdateProgram);
}

export default function* program() {
  yield fork(fetchProgram);
  yield fork(fetchAllPrograms);
  yield fork(addProgram);
  yield fork(updateProgram);
}