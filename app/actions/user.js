import createRequestType from './utils/create-request-type';
import createRequestAction from './utils/create-request-action';

export const USER_REGISTER = createRequestType('USER_REGISTER');
export const USER_LOGIN = createRequestType('USER_LOGIN');

const register = createRequestAction(USER_REGISTER);
const login = createRequestAction(USER_LOGIN);

export {
  register,
  login,
};
