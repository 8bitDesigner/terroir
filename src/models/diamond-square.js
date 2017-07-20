/* eslint-disable no-multi-spaces */
import AbstractGenerator from './base'
import { rand, floor, avg, jitter } from '../lib/rand-utils'

export default class DiamondSquareGenerator extends AbstractGenerator {
  constructor (size, initialValue = 0, lowValue = 0, highValue = 255) {
    super(size)

    this.erosion = -0.65
    this.lowValue = lowValue
    this.highValue = highValue
    this.reset()
  }

  reset () {
    const range = floor(avg(this.highValue, this.lowValue))
    const center = floor(avg(0, this.last))

    super.reset()

    this.set(0, 0, floor(rand()))
    this.set(0, this.last, floor(rand()))
    this.set(this.last, 0, floor(rand()))
    this.set(this.last, this.last, floor(rand()))

    this.diamondSquare(center, range)
  }

  diamondSquare (radius, range) {
    if (radius >= 1) {
      this.queue.push(() => this.squares(radius, range))
      this.queue.push(() => this.diamonds(radius, range))
      this.diamondSquare(radius / 2, floor(range * Math.pow(2.0, this.erosion)))
    } else {
      this.normalize()
    }
  }

  squares (radius, range) {
    const step = radius * 2
    for (let x = radius; x < this.size; x += step) {
      for (let y = radius; y < this.size; y += step) {
        this.square(x, y, radius, range)
      }
    }
  }

  square (x, y, rdx, range) {
    this.set(x, y, floor(jitter(avg(
      this.get(x - rdx, y - rdx),
      this.get(x - rdx, y + rdx),
      this.get(x + rdx, y - rdx),
      this.get(x + rdx, y + rdx)
    ), range)))
  }

  diamonds (radius, range) {
    for (let y = 0; y < this.size; y += radius) {
      const shift = (y / radius % 2 === 0) ? radius : 0
      for (let x = shift; x < this.size; x += radius * 2) {
        this.diamond(x, y, radius, range)
      }
    }
  }

  diamond (x, y, rdx, range) {
    this.set(x, y, floor(jitter(avg(
      this.get(x - rdx, y),
      this.get(x - rdx, y),
      this.get(x, y - rdx),
      this.get(x, y + rdx)
    ), range)))
  }
}
