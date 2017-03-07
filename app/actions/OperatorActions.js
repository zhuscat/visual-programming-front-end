import uuid from '../utils/uuid';

export const addOperator = ({ parentId, playload, area }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('OPERATOR'),
    parentId,
    playload,
    moduleType: 'OPERATOR',
    op: 'plus',
  },
});

export const changeOperator = ({ id, first, firstType, second, secondType, op, assign }) => ({
  type: 'UPDATE_MODULE',
  module: {
    id,
    first,
    firstType,
    second,
    secondType,
    op,
    assign,
  },
});

export const deleteOperator = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
