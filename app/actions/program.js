import createRequestType from './utils/create-request-type';
import createRequestAction from './utils/create-request-action';

export const ADD_PROGRAM = createRequestType('ADD_PROGRAM');
export const UPDATE_PROGRAM = createRequestType('UPDATE_PROGRAM');
export const FETCH_PROGRAM = createRequestType('FETCH_PROGRAM');
export const FETCH_ALL_PROGRAMS = createRequestType('FETCH_ALL_PROGRAMS');

const addProgram = createRequestAction(ADD_PROGRAM);
const updateProgram = createRequestAction(UPDATE_PROGRAM);
const fetchProgram = createRequestAction(FETCH_PROGRAM);
const fetchAllProgram = createRequestAction(FETCH_ALL_PROGRAMS);

export {
  addProgram,
  updateProgram,
  fetchProgram,
  fetchAllProgram,
};
