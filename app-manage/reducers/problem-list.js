import * as actions from '../actions/problem';

const initialState = {
  isLoading: false,
  items: [],
};

const problemList = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_ALL_PROBLEMS.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.FETCH_ALL_PROBLEMS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.response,
      };
    case actions.FETCH_ALL_PROBLEMS.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actions.DELETE_PROBLEM.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.DELETE_PROBLEM.SUCCESS:
      {
        let index = -1;
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].id === action.id) {
            index = i;
          }
        }
        if (index !== -1) {
          return {
            ...state,
            isLoading: false,
            items: [...state.items.slice(0, index), ...state.items.slice(index + 1)],
          };
        }
        return {
          ...state,
          isLoading: false,
        };
      }
    case actions.DELETE_PROBLEM.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default problemList;
