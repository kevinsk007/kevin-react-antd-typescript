import { take, all, fork, put } from 'redux-saga/effects'

function* watchIsLogin() {
  while (true) {
    //监听登入事件
    const action1 = yield take('TO_LOGIN_IN')
    const { password, username } = action1.payload

    // 自定义成功失败
    if (password !== 'admin' || username !== 'admin') {
      yield put({ type: 'login_failed', data: Object.assign(action1.payload, { msg: '登录失败' }) })
    } else {
      yield put({ type: 'login_success', data: Object.assign(action1.payload, { msg: '登录成功' }) })
    }
    // const res = yield call(fetchSmart, '/login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     username: action1.username,
    //     password: action1.password,
    //   }),
    // })
    // //根据返回的状态码判断登陆是否成功
    // if (res.status === 10000) {
    //   yield put({ type: 'to_login_in' })
    //   //登陆成功后获取首页的活动列表
    //   yield fork(getList)
    // }
    // //监听登出事件
    // const action2 = yield take('TO_LOGIN_OUT')
    // yield put({ type: 'to_login_out' })
  }
}

export function* loginRootSaga() {
  yield all([fork(watchIsLogin)])
}
