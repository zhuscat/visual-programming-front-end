import createRequestType from './utils/create-request-type';
import createRequestAction from './utils/create-request-action';

export const SAVE_PROBLEM = createRequestType('SAVE_PROBLEM');
export const EXEC_PROBLEM = createRequestType('EXEC_PROBLEM');
export const FETCH_ALL_PROBLEMS = createRequestType('FETCH_ALL_PROBLEMS');
export const FETCH_PROBLEM = createRequestType('FETCH_PROBLEM');
export const UPDATE_PROBLEM = createRequestType('UPDATE_PROBLEM');
export const CREATE_PROBLEM_LOCAL = 'CREATE_PROBLEM_LOCAL';
export const DELETE_PROBLEM = createRequestType('DELETE_PROBLEM');

const saveProblem = createRequestAction(SAVE_PROBLEM);
const execProblem = createRequestAction(EXEC_PROBLEM);
const fetchAllProblems = createRequestAction(FETCH_ALL_PROBLEMS);
const fetchProblem = createRequestAction(FETCH_PROBLEM);
const updateProblem = createRequestAction(UPDATE_PROBLEM);
const createLocal = () => {
  return {
    type: CREATE_PROBLEM_LOCAL,
  };
};
const deleteProblem = createRequestAction(DELETE_PROBLEM);

export {
  saveProblem,
  execProblem,
  fetchAllProblems,
  fetchProblem,
  updateProblem,
  createLocal,
  deleteProblem,
};
