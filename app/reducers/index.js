import { combineReducers } from 'redux';
import entities from './entities';
import variableArea from './variableArea';
import procedureArea from './ProcedureReducer';
import program from './program';
import user from './user';
import programList from './program-list';


const rootReducer = combineReducers({
  entities,
  variableArea,
  procedureArea,
  program,
  user,
  programList,
});

export default rootReducer;
