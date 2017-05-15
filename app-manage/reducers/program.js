import * as actions from '../actions/program';
import * as problemActions from '../actions/problem';

const initialState = {
  id: '',
  name: '',
  description: '',
  isLoading: false,
  variableArea: [],
  procedureArea: [],
  testCaseArea: [],
  state: 0,
};

// TODO: simply combine procedure area and variable area, need to improve performance
const program = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      if (!action.module.parentId && action.area === 'VARIABLE_AREA') {
        return {
          ...state,
          variableArea: [...state.variableArea, action.module.id],
        };
      } else if (!action.module.parentId && action.area === 'PROCEDURE_AREA') {
        return {
          ...state,
          procedureArea: [...state.procedureArea, action.module.id],
        };
      } else if (!action.module.parentId && action.area === 'TESTCASE_AREA') {
        return {
          ...state,
          testCaseArea: [...state.testCaseArea, action.module.id],
        };
      }
      return state;
    case 'DELETE_MODULE':
      {
        let idx = state.variableArea.indexOf(action.module.id);
        let area = '';
        if (idx !== -1) {
          area = 'variableArea';
        }
        idx = state.procedureArea.indexOf(action.module.id);
        if (idx !== -1) {
          area = 'procedureArea';
        }
        idx = state.testCaseArea.indexOf(action.module.id);
        if (idx !== -1) {
          area = 'testCaseArea';
        }
        if (area) {
          return {
            ...state,
            [area]: [...state[area].slice(0, idx), ...state[area].slice(idx + 1)],
          };
        }
        return state;
      }
    case actions.FETCH_PROGRAM.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.FETCH_PROGRAM.SUCCESS:
      return {
        ...state,
        isLoading: false,
        id: action.id,
        name: action.name,
        description: action.description,
        variableArea: action.variableArea,
        procedureArea: action.procedureArea,
        testCaseArea: action.testCaseArea,
      };
    case actions.FETCH_PROGRAM.FAILURE:
      return {
        ...state,
        isLoading: false,
        variableArea: [],
        procedureArea: [],
        testCaseArea: [],
      };
    case actions.CREATE_PROGRAM_LOCAL:
      return {
        ...state,
        id: '',
        name: '',
        description: '',
        isLoading: false,
        variableArea: [],
        procedureArea: [],
        testCaseArea: [],
      };
    case actions.ADD_PROGRAM.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.ADD_PROGRAM.SUCCESS:
      return {
        ...state,
        isLoading: false,
        id: action.response.programId,
      };
    case actions.ADD_PROGRAM.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actions.UPDATE_PROGRAM.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.UPDATE_PROGRAM.SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actions.UPDATE_PROGRAM.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actions.PROGRAM_TITLE_CHANGE:
      return {
        ...state,
        name: action.value,
      };
    case actions.PROGRAM_DESC_CHANGE:
      return {
        ...state,
        description: action.value,
      };
    case problemActions.FETCH_PROBLEM.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case problemActions.FETCH_PROBLEM.SUCCESS:
      return {
        ...state,
        isLoading: false,
        id: action.id,
        name: action.name,
        description: action.description,
        variableArea: action.variableArea,
        procedureArea: action.procedureArea,
        testCaseArea: action.testCaseArea,
      };
    case problemActions.FETCH_PROBLEM.FAILURE:
      return {
        ...state,
        isLoading: false,
        variableArea: [],
        procedureArea: [],
        testCaseArea: [],
      };
    case problemActions.UPDATE_PROBLEM.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    // TODO: 目前的需求是只改 state
    case problemActions.UPDATE_PROBLEM.SUCCESS:
      return {
        ...state,
        isLoading: false,
        state: action.program.state,
      };
    case problemActions.UPDATE_PROBLEM.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default program;
