const variableArea = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      if (!action.module.parentId && action.area === 'VARIABLE_AREA') {
        return [...state, action.module.id];
      }
      return state;
    case 'DELETE_MODULE':
      // TODO: 这里要去删除数组中的元素
      return state;
    default:
      return state;
  }
};

export default variableArea;
