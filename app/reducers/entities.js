import _ from 'lodash';
import * as actions from '../actions/program';

const modules = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      if (action.module.parentId && action.module.playload) {
        // TODO: 暂时先 mutable 吧，看一下是否可行，之后改成 immutable
        if (action.module.playload === 'procedure') {
          state[action.module.parentId][action.module.playload].push(action.module.id);
        } else if (action.module.playload === 'condition') {
          state[action.module.parentId][action.module.playload] = action.module.id;
        }
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
          // 因为 condition 变成字符串了，所以就直接删除 m.condition
          // m.condition 是键值
          if (m.condition) {
            delete shallowState[m.condition];
          }
          if (m.procedure) {
            m.procedure.map((id) => {
              delete shallowState[id];
            });
          }
        }
        return _.omit(shallowState, action.module.id);
      }
    case actions.FETCH_PROGRAM.SUCCESS:
      // 替换掉 entities
      return action.entities;
    case actions.CREATE_PROGRAM_LOCAL:
      return {};
    default:
      return state;
  }
};

export default modules;
