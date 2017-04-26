import uuid from '../utils/uuid';

export const addUnaryOperator = ({ parentId, playload, area }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('OPERATOR'),
    parentId,
    playload,
    moduleType: 'OPERATOR',
    op: 'unary_plus',
    sub: 'UNARY',
  },
});

export const changeUnaryOperator = ({ id, first, firstType, op, assignValue }) => ({
  type: 'UPDATE_MODULE',
  module: {
    id,
    first,
    firstType,
    op,
    assignValue,
  },
});

export const deleteUnaryOperator = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
