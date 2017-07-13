/* eslint-disable no-multi-spaces */
import AbstractGenerator from './base'
import { floor, avg, jitter } from '../lib/rand-utils'

export default class DiamondSquareGenerator extends AbstractGenerator {
  constructor (size, initialValue = 0, lowValue = 0, highValue = 255) {
    super(size)

    this.erosion = -0.75
    this.lowValue = lowValue
    this.highValue = highValue
    this.reset()
  }

  reset () {
    const range = floor(avg(this.highValue, this.lowValue))
    this.queue = []

    this.set(0, 0, range)
    this.set(0, this.last, range)
    this.set(this.last, 0, range)
    this.set(this.last, this.last, range)

    this.queue.push(() => this.diamondSquare(0, 0, this.last, this.last, range))
  }

  step () {
    if (this.queue.length) { this.queue.shift()() }
  }

  run () {
    while (this.queue.length) { this.step() }
  }

  diamondSquare (left, top, right, bottom, range) {
    const cx = floor(avg(left, right))
    const cy = floor(avg(top, bottom))
    const displace = (...args) => floor(jitter(avg(...args), range))

    this.set(cx, cy, displace(
      this.get(left, top),
      this.get(right, top),
      this.get(right, bottom),
      this.get(left, bottom)
    ))

    this.set(cx, top,    displace(this.get(left, top),    this.get(right, top)))
    this.set(right, cy,  displace(this.get(right, top),   this.get(right, bottom)))
    this.set(cx, bottom, displace(this.get(left, bottom), this.get(right, bottom)))
    this.set(left, cy,   displace(this.get(left, top),    this.get(left, bottom)))

    this.normalize()

    if ((right - left) > 2) {
      range = floor(range * Math.pow(2.0, this.erosion))
      this.queue.push(() => this.diamondSquare(left, top, cx, cy, range))
      this.queue.push(() => this.diamondSquare(cx, top, right, cy, range))
      this.queue.push(() => this.diamondSquare(left, cy, cx, bottom, range))
      this.queue.push(() => this.diamondSquare(cx, cy, right, bottom, range))
    }
  }
}
