import { combineReducers } from 'redux';
import VariableReducer from './VariableReducer';
import modules from './modules';
import variableArea from './variableArea';
import procedureArea from './ProcedureReducer';


const entities = modules;

const rootReducer = combineReducers({
  entities,
  variableArea,
  procedureArea,
});

export default rootReducer;
