import { fork } from 'redux-saga/effects';
import program from './program';
import user from './user';

export default function* root() {
  yield fork(program);
  yield fork(user);
}
