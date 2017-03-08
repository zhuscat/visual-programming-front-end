import _ from 'lodash';

const modules = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      if (action.module.parentId && action.module.playload) {
        // TODO: 暂时先 mutable 吧，看一下是否可行，之后改成 immutable
        state[action.module.parentId][action.module.playload].push(action.module.id);
      }
      return {
        ...state,
        [action.module.id]: {
          ...action.module,
        },
      };
    case 'UPDATE_MODULE':
      return {
        ...state,
        [action.module.id]: {
          ...state[action.module.id],
          ...action.module,
        },
      };
    case 'DELETE_MODULE':
      {
        const shallowState = Object.assign({}, state);
        const m = state[action.module.id];
        if (m) {
          if (m.condition) {
            m.condition.map((id) => {
              delete shallowState[id];
            });
          }
          if (m.procedure) {
            m.procedure.map((id) => {
              delete shallowState[id];
            });
          }
        }
        return _.omit(shallowState, action.module.id);
      }
    default:
      return state;
  }
};

export default modules;
