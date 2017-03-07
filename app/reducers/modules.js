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
      return _.omit(state, action.module.id);
    default:
      return state;
  }
};

export default modules;
