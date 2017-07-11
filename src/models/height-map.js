import * as chalk from 'chalk'

export function heightMap (value) {
  if (value <= 255 && value > 204) {
    return chalk.bgYellow.white('^')
  } else if (value <= 204 && value > 140) {
    return chalk.bgYellow('^')
  } else if (value <= 140 && value > 115) {
    return chalk.bgGreenBright.green('*')
  } else if (value <= 115 && value > 90) {
    return chalk.bgGreenBright(' ')
  } else if (value <= 90) {
    return chalk.bgBlue(' ')
  } else {
    return 'oh noes!'
  }
}
