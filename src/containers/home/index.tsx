import * as React from 'react'
export default class Home extends React.Component<any, any> {
  componentDidMount() {}
  render() {
    const { history } = this.props
    return <div onClick={() => history.push('/login')}>登录成功进入首页</div>
  }
}
