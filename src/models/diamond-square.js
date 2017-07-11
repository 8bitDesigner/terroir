/* eslint-disable no-multi-spaces */
const floor = Math.floor.bind(Math)
const rand = Math.random.bind(Math)
const sum = arr => arr.reduce((a, b) => a + b, 0)
const avg = (...args) => sum(args) / args.length

export default class Grid {
  constructor (size, lowValue = 0, highValue = 255) {
    this.size = size
    this.lowValue = lowValue
    this.highValue = highValue

    this.reset()
  }

  reset () {
    const midValue = floor(avg(this.lowValue, this.highValue))
    const first = 0
    const last = this.size - 1

    this.queue = []
    this.rows = []

    for (let i = 0; i < this.size; i++) {
      this.rows[i] = []
      for (let j = 0; j < this.size; j++) {
        this.rows[i][j] = null
      }
    }

    this.setCell(first, first, midValue)
    this.setCell(first, last, midValue)
    this.setCell(last, first, midValue)
    this.setCell(last, last, midValue)

    this.queue.push({
      startX: first,
      startY: first,
      endX: last,
      endY: last,
      baseHeight: midValue
    })
  }

  getCell (x, y) {
    return this.rows[y][x]
  }

  setCell (x, y, v) {
    this.rows[y][x] = v
  }

  step () {
    const {startX, startY, endX, endY, baseHeight} = this.queue.shift()
    this.diamondSquare(startX, startY, endX, endY, baseHeight)
  }

  run () {
    while (this.queue.length) { this.step() }
  }

  diamondSquare (left, top, right, bottom, baseHeight) {
    const xCenter = floor(avg(left, right))
    const yCenter = floor(avg(top, bottom))
    const noise = (rand() - 0.5) * baseHeight

    const centerPointValue = floor(avg(
      this.getCell(left, top),
      this.getCell(right, top),
      this.getCell(left, bottom),
      this.getCell(right, bottom)
    ) - (noise * 2))

    this.setCell(xCenter, yCenter, centerPointValue)

    this.setCell(xCenter, top,      floor(avg(this.getCell(left,  top),    this.getCell(right, top))    + noise))
    this.setCell(xCenter, bottom,   floor(avg(this.getCell(left,  bottom), this.getCell(right, bottom)) + noise))
    this.setCell(left,    yCenter,  floor(avg(this.getCell(left,  top),    this.getCell(left,  bottom)) + noise))
    this.setCell(right,   yCenter,  floor(avg(this.getCell(right, top),    this.getCell(right, bottom)) + noise))

    if ((right - left) > 2) {
      baseHeight = floor(baseHeight * Math.pow(2.0, -0.75))

      this.queue.push({startX: left,    startY: top,     endX: xCenter, endY: yCenter, baseHeight})
      this.queue.push({startX: xCenter, startY: top,     endX: right,   endY: yCenter, baseHeight})
      this.queue.push({startX: left,    startY: yCenter, endX: xCenter, endY: bottom,  baseHeight})
      this.queue.push({startX: xCenter, startY: yCenter, endX: right,   endY: bottom,  baseHeight})
    }
  }
}
