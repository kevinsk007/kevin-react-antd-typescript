const totalState = {
  isLogin: false,
  username: '',
  password: '',
}

export default function(state = totalState, action) {
  console.log(action)
  switch (action.type) {
    case 'login_success':
      return { loginStatus: Object.assign({ isLogin: true }, action.data) }
    case 'login_failed':
      return { loginStatus: Object.assign({ isLogin: false }, action.data) }
    default:
      return state
  }
}
