import { all, fork } from 'redux-saga/effects'
import { loginRootSaga } from './login'
export function* rootSaga() {
  yield all([fork(loginRootSaga)])
}
