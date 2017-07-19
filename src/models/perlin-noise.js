/* eslint-disable no-multi-spaces */
import noise from 'noisejs-umd'
import AbstractGenerator from './base'
import { floor } from '../lib/rand-utils'

export default class PerlinNoiseGenerator extends AbstractGenerator {
  constructor (exponent, type = 'perlin2') {
    super(exponent)
    this.erosion = -0.85
    this.type = type
    this.reset()
  }

  reset () {
    super.reset()
    this.noise(100, 256, this.size - 1)
  }

  apply (scale, range) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const value = noise.perlin2(x / scale, y / scale)
        const current = this.get(x, y) || 0
        this.set(x, y, current + Math.floor(Math.abs(value) * range))
      }
    }
  }

  noise (scale, range, steps) {
    noise.seed(Math.random())
    this.apply(scale, range)
    this.normalize()

    if (steps > 2) {
      scale = scale / 2
      range = floor(range * Math.pow(2.0, this.erosion))
      steps = steps - 1

      this.queue.push(() => this.noise(scale, range, steps))
    }
  }
}

