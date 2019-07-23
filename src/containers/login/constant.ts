/**
 * 生成验证码
 */
export const generateCode = data => {
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
  data.clearRect(0, 0, 80, 39)
  for (let i = 0; i < 4; i++) {
    const char = chars[randomNum(0, 57)]
    code += char
    data.font = randomNum(20, 25) + 'px SimHei' //设置字体随机大小
    data.fillStyle = '#D3D7F7'
    data.textBaseline = 'middle'
    data.shadowOffsetX = randomNum(-3, 3)
    data.shadowOffsetY = randomNum(-3, 3)
    data.shadowBlur = randomNum(-3, 3)
    data.shadowColor = 'rgba(0, 0, 0, 0.3)'
    let x = (80 / 5) * (i + 1)
    let y = 39 / 2
    let deg = randomNum(-25, 25)
    /**设置旋转角度和坐标原点**/
    data.translate(x, y)
    data.rotate((deg * Math.PI) / 180)
    data.fillText(char, 0, 0)
    /**恢复旋转角度和坐标原点**/
    data.rotate((-deg * Math.PI) / 180)
    data.translate(-x, -y)
  }
  return code
}

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}
