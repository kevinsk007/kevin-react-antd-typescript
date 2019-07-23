const types = {
  TO_LOGIN_IN: 'TO_LOGIN_IN',
}
interface BaseAction {
  type: string
  payload: any
}

export const toLoginIn = (username: String, password: String) => {
  return {
    type: types.TO_LOGIN_IN,
    payload: {
      username: username,
      password: password,
    },
  }
}
