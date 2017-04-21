import * as actions from '../actions/program';

const initialState = {
  isLoading: false,
  items: [],
};

const programList = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_ALL_PROGRAMS.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.FETCH_ALL_PROGRAMS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: actions.response,
      };
    case actions.FETCH_ALL_PROGRAMS.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default programList;
