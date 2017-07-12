/* eslint-disable no-multi-spaces */
import AbstractGenerator from './base'

const floor = Math.floor.bind(Math)
const rand = Math.random.bind(Math)
const sum = arr => arr.reduce((a, b) => a + b, 0)
const avg = (...args) => sum(args) / args.length

export default class MidpointDisplacementGenerator extends AbstractGenerator {
  constructor (size, initialValue = 0) {
    super(size)
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
    this.midpointDisplace(startX, startY, endX, endY, baseHeight)
  }

  run () {
    while (this.queue.length) { this.step() }
  }

  midpointDisplace (left, top, right, bottom, baseHeight) {
  }
}

