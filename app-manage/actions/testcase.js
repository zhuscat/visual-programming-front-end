import uuid from '../utils/uuid';

export const addTestCase = ({ area, inputs, expect }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('TESTCASE'),
    moduleType: 'TESTCASE',
    inputs,
    expect,
  },
});

export const changeTestCase = ({ id, inputs, expect }) => ({
  type: 'UPDATE_MODULE',
  module: {
    id,
    inputs,
    expect,
  },
});

export const deleteModule = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
