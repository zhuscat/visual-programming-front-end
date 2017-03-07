import uuid from '../utils/uuid';

export const addUnaryOperator = ({ parentId, playload, area }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('UNARYOPERATOR'),
    parentId,
    playload,
    moduleType: 'UNARYOPERATOR',
    op: 'plus',
  },
});

export const changeUnaryOperator = ({ id, val, valType, op, assign }) => ({
  type: 'UPDATE_MODULE',
  module: {
    id,
    val,
    valType,
    op,
    assign,
  },
});

export const deleteUnaryOperator = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
