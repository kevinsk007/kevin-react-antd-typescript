import { take, all, fork, put, call } from 'redux-saga/effects'

import { fetchSmart } from '../utils'
// import { push } from 'connected-react-router'

// import history from '../history'

function* watchIsLogin() {
  while (true) {
    //监听登入事件 react yield put push
    const action1 = yield take('TO_LOGIN_IN')
    const { history } = action1.payload
    const res = yield call(fetchSmart, '/mock/products/discounts.json', {
      method: 'GET',
      // body: JSON.stringify({
      //   username: action1.username,
      //   password: action1.password,
      // }),
    })
    if (res && res.length > 0) {
      yield put({ type: 'login_success', data: res })
      // yield put(push('./home'))
      history.push('/home')
    }
  }
}

export function* loginRootSaga() {
  yield all([fork(watchIsLogin)])
}
