import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Row, Col, Icon, Button, Tooltip } from 'antd'
import './index.scss'
import { generateCode } from './constant'
import injectionFrom from '../../components/injectionFrom'
import { toLoginIn } from '../../redux/login/action'

@injectionFrom()
class Login extends React.Component<any, any> {
  private canvas = null
  constructor(props) {
    super(props)
    this.state = {
      focusItem: null,
      code: null,
    }
  }

  componentDidMount() {
    this.createCode()
  }

  loginSubmit = () => {
    this.setState({
      focusItem: -1,
    })
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 表单是借用别人的方法
        if (this.state.code.toUpperCase() !== values.verification.toUpperCase()) {
          this.props.form.setFields({
            verification: {
              value: values.verification,
              errors: [new Error('验证码错误')],
            },
          })
          return
        }
        const { toLoginIn, loginInfo, history } = this.props
        await toLoginIn(values.username, values.password)
        if (loginInfo && loginInfo.isLogin) {
          history.push('./home')
        } else if (loginInfo && !loginInfo.isLogin) {
          alert(loginInfo.msg)
        }
      }
    })
  }
  /**
   * 生成验证码
   */
  createCode = () => {
    const ctx = this.canvas.getContext('2d')
    const code = generateCode(ctx)
    this.setState({ code })
  }
  checkUnitRules = (rule, value, callback) => {
    const { code } = this.state
    if (value) {
      if (value.length >= 4 && code.toUpperCase() !== value.toUpperCase()) {
        callback('验证码错误')
      } else if (value.length < 4) {
        callback('验证码错误')
      } else {
        callback()
      }
    } else {
      callback('验证码错误')
    }
  }

  render() {
    const { focusItem } = this.state
    const { getFieldDecorator, getFieldError } = this.props.form
    return (
      <div className="container-login">
        <div className="background" id="backgroundBox">
          <div className="container-login-form">
            <div className="box showBox">
              <Form>
                <h3 className="title">管理员登录</h3>
                <Form.Item>
                  <Tooltip placement="right" title={getFieldError('username')} visible={!!getFieldError('username')}>
                    {getFieldDecorator('username', { rules: [{ required: true, message: '请输入用户名' }] })(
                      <Input
                        onFocus={() => this.setState({ focusItem: 0 })}
                        onBlur={() => this.setState({ focusItem: -1 })}
                        maxLength={16}
                        placeholder="用户名"
                        addonBefore={
                          <Icon
                            type="user"
                            className="iconfont"
                            style={
                              focusItem === 0
                                ? {
                                    width: 20,
                                    opacity: 1,
                                  }
                                : {}
                            }
                          />
                        }
                      />,
                    )}
                  </Tooltip>
                </Form.Item>
                <Form.Item>
                  <Tooltip placement="right" title={getFieldError('password')} visible={!!getFieldError('password')}>
                    {getFieldDecorator('password', { rules: [{ required: true, message: '请输入密码' }] })(
                      <Input
                        onFocus={() => this.setState({ focusItem: 1 })}
                        onBlur={() => this.setState({ focusItem: -1 })}
                        type="password"
                        maxLength={16}
                        placeholder="密码"
                        addonBefore={
                          <Icon
                            className="iconfont"
                            type="unlock"
                            style={
                              focusItem === 1
                                ? {
                                    width: 20,
                                    opacity: 1,
                                  }
                                : {}
                            }
                          />
                        }
                      />,
                    )}
                  </Tooltip>
                </Form.Item>
                <Form.Item>
                  <Row>
                    <Col span={15}>
                      {getFieldDecorator('verification', {
                        rules: [
                          {
                            validator: this.checkUnitRules,
                          },
                        ],
                      })(
                        <Input
                          onFocus={() => this.setState({ focusItem: 2 })}
                          onBlur={() => this.setState({ focusItem: -1 })}
                          maxLength={4}
                          placeholder="验证码"
                          addonBefore={
                            <Icon
                              type="mobile"
                              className="iconfont "
                              style={
                                focusItem === 2
                                  ? {
                                      width: 20,
                                      opacity: 1,
                                    }
                                  : {}
                              }
                            />
                          }
                        />,
                      )}
                    </Col>
                    <Col span={9}>
                      <Tooltip
                        placement="right"
                        title={getFieldError('verification')}
                        visible={!!getFieldError('verification')}
                      >
                        <canvas onClick={this.createCode} width="90" height="39" ref={el => (this.canvas = el)} />
                      </Tooltip>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
              <div className="bottom">
                <Button type="primary" onClick={this.loginSubmit}>
                  登录
                </Button>
                {/* <input className="loginBtn" type="submit" value="登录" /> */}
                {/* <span className="registerBtn" onClick={this.register}>
                  注册
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const { loginStatus } = state.login
  return {
    loginInfo: loginStatus || {},
  }
}
const mapStateToDispatch = dispatch => {
  return {
    toLoginIn: (username, password) => {
      dispatch(toLoginIn(username, password))
    },
  }
}
export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(Login)
