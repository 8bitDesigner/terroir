/* eslint-disable no-multi-spaces */
import AbstractGenerator from './base'

const floor = Math.floor.bind(Math)
const rand = Math.random.bind(Math)
const sum = arr => arr.reduce((a, b) => a + b, 0)
const avg = (...args) => sum(args) / args.length

export default class DiamondSquareGenerator extends AbstractGenerator {
  constructor (size, initialValue = 0, lowValue = 0, highValue = 255) {
    super(size)

    this.lowValue = lowValue
    this.highValue = highValue
    this.reset()
  }

  reset () {
    const midValue = floor(avg(this.lowValue, this.highValue))
    this.queue = []

    this.set(0, 0, midValue)
    this.set(0, this.last, midValue)
    this.set(this.last, 0, midValue)
    this.set(this.last, this.last, midValue)

    this.queue.push({
      startX: 0,
      startY: 0,
      endX: this.last,
      endY: this.last,
      baseHeight: midValue
    })
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
      this.get(left, top),
      this.get(right, top),
      this.get(left, bottom),
      this.get(right, bottom)
    ) - (noise * 2))

    this.set(xCenter, yCenter, centerPointValue)

    this.set(xCenter, top,      floor(avg(this.get(left,  top),    this.get(right, top))    + noise))
    this.set(xCenter, bottom,   floor(avg(this.get(left,  bottom), this.get(right, bottom)) + noise))
    this.set(left,    yCenter,  floor(avg(this.get(left,  top),    this.get(left,  bottom)) + noise))
    this.set(right,   yCenter,  floor(avg(this.get(right, top),    this.get(right, bottom)) + noise))

    if ((right - left) > 2) {
      baseHeight = floor(baseHeight * Math.pow(2.0, -0.75))

      this.queue.push({startX: left,    startY: top,     endX: xCenter, endY: yCenter, baseHeight})
      this.queue.push({startX: xCenter, startY: top,     endX: right,   endY: yCenter, baseHeight})
      this.queue.push({startX: left,    startY: yCenter, endX: xCenter, endY: bottom,  baseHeight})
      this.queue.push({startX: xCenter, startY: yCenter, endX: right,   endY: bottom,  baseHeight})
    }
  }
}
