const procedureArea = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      console.log('create');
      if (!action.module.parentId && action.area === 'PROCEDURE_AREA') {
        return [...state, action.module.id];
      }
      return state;
    default:
      return state;
  }
};

export default procedureArea;
