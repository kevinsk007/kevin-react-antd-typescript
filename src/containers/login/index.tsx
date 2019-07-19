import * as React from 'react'
import { Form, Input, Row, Col, Icon, Button } from 'antd'
import './index.scss'
// import { createForm } from 'rc-form'
import injectionFrom from '../../components/injectionFrom'

@injectionFrom()
export default class Home extends React.Component<any, any> {
  private canvas
  constructor(props) {
    super(props)
    this.state = {
      focusItem: null,
    }
  }

  componentDidMount() {
    this.createCode()
  }

  loginSubmit = () => {
    console.log(2)
  }
  /**
   * 生成验证码
   */
  createCode = () => {
    const ctx = this.canvas.getContext('2d')
    const chars = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'm',
      'n',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'J',
      'K',
      'L',
      'M',
      'N',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ]
    let code = ''
    ctx.clearRect(0, 0, 80, 39)
    for (let i = 0; i < 4; i++) {
      const char = chars[this.randomNum(0, 57)]
      code += char
      ctx.font = this.randomNum(20, 25) + 'px SimHei' //设置字体随机大小
      ctx.fillStyle = '#D3D7F7'
      ctx.textBaseline = 'middle'
      ctx.shadowOffsetX = this.randomNum(-3, 3)
      ctx.shadowOffsetY = this.randomNum(-3, 3)
      ctx.shadowBlur = this.randomNum(-3, 3)
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      let x = (80 / 5) * (i + 1)
      let y = 39 / 2
      let deg = this.randomNum(-25, 25)
      /**设置旋转角度和坐标原点**/
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(char, 0, 0)
      /**恢复旋转角度和坐标原点**/
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    }
    this.setState({
      code,
    })
  }
  randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }
  render() {
    const { focusItem } = this.state
    console.log(this.props)
    return (
      <div className="container-login">
        <div className="background" id="backgroundBox">
          <div className="container-login-form">
            <div className="box showBox">
              <Form onSubmit={this.loginSubmit}>
                <h3 className="title">管理员登录</h3>
                <Form.Item>
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
                  />
                </Form.Item>
                <Form.Item>
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
                  />
                </Form.Item>
                <Form.Item>
                  <Row>
                    <Col span={15}>
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
                      />
                    </Col>
                    <Col span={9}>
                      <canvas onClick={this.createCode} width="80" height="39" ref={el => (this.canvas = el)} />
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
