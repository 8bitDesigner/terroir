/* eslint-disable no-multi-spaces */
import AbstractGenerator from './base'
import { rand, avg, jitter, floor } from '../lib/rand-utils'

export default class MidpointDisplacementGenerator extends AbstractGenerator {
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

    this.set(0, 0, floor(rand()))
    this.set(0, this.last, floor(rand()))
    this.set(this.last, 0, floor(rand()))
    this.set(this.last, this.last, floor(rand()))

    this.queue.push(() => this.midpointDisplace(0, 0, this.last, this.last, range))
  }

  step () {
    if (this.queue.length) { this.queue.shift()() }
  }

  run () {
    while (this.queue.length) { this.step() }
  }

  midpointDisplace (left, top, right, bottom, range) {
    const cx = floor(avg(left, right))
    const cy = floor(avg(top, bottom))
    const displace = (...args) => floor(jitter(avg(...args), range))

;   this.set(cx, top,    displace(this.get(left, top),    this.get(right, top)))
    this.set(right, cy,  displace(this.get(right, top),   this.get(right, bottom)))
    this.set(cx, bottom, displace(this.get(left, bottom), this.get(right, bottom)))
    this.set(left, cy,   displace(this.get(left, top),    this.get(left, bottom)))

    this.set(cx, cy, displace(
      this.get(cx, top),
      this.get(right, cy),
      this.get(cx, bottom),
      this.get(left, cy)
    ))

    this.normalize()

    if ((right - left) > 2) {
      range = floor(range * Math.pow(2.0, this.erosion))
      this.queue.push(() => this.midpointDisplace(left, top, cx, cy, range))
      this.queue.push(() => this.midpointDisplace(cx, top, right, cy, range))
      this.queue.push(() => this.midpointDisplace(left, cy, cx, bottom, range))
      this.queue.push(() => this.midpointDisplace(cx, cy, right, bottom, range))
    }
  }
}

