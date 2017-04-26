import { combineReducers } from 'redux';
import entities from './entities';
import variableArea from './variableArea';
import procedureArea from './ProcedureReducer';
import program from './program';
import user from './user';
import programList from './program-list';
import error from './error';


const rootReducer = combineReducers({
  entities,
  program,
  user,
  programList,
  error,
});

export default rootReducer;
