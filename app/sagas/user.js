import { take, put, call, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { api, history } from '../services';
import * as userActions from '../actions/user';

export function* runLogin({ username, password }) {
  const { response, error } = yield call(api.login, username, password);
  if (response) {
    yield put(userActions.login.success({ username }, response));
  } else {
    yield put(userActions.login.failure({ username }, error));
  }
}

export function* runRegister({ username, password, email }) {
  const { response, error } = yield call(api.register, username, password, email);
  if (response) {
    yield put(userActions.register.success({ username }, response));
  } else {
    yield put(userActions.register.failure({ username }, error));
  }
}

export function* login() {
  yield* takeEvery(userActions.USER_LOGIN.REQUEST, runLogin);
}

export function* register() {
  yield* takeEvery(userActions.USER_REGISTER.REQUEST, runRegister);
}

export default function* user() {
  yield fork(login);
  yield fork(register);
}
