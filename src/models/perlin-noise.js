/* eslint-disable no-multi-spaces */
import noise from 'noisejs-umd'
import AbstractGenerator from './base'

export default class PerlinNoiseGenerator extends AbstractGenerator {
  constructor (exponent, type = 'perlin2') {
    super(exponent)
    this.type = type
    this.reset()
  }

  reset () {
    noise.seed(Math.random())
    super.reset()
  }

  run () {
    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        var value = noise.perlin2(x / 50, y / 50)
        this.set(x, y, Math.floor(Math.abs(value) * 256))
      }
    }
  }
}

