/* eslint-disable no-multi-spaces */
import noise from 'noisejs-umd'
import AbstractGenerator from './base'

export default class PerlinOctaveGenerator extends AbstractGenerator {
  constructor (exponent, type = 'perlin2') {
    super(exponent)
    this.erosion = -0.85
    this.type = type
    this.reset()
  }

  reset () {
    super.reset()

    noise.seed(Math.random())

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        let val = (this.octaves(x, y, 3, 1) + 0.4) * 255
        val = Math.floor(val > 255 ? 255 : val < 0 ? 0 : val)
        this.set(x, y, val)
      }
    }
  }

  octaves (x, y, octaves, persistence) {
    let total = 0
    let frequency = 1
    let amplitude = 1
    let maxValue = 0  // Used for normalizing result to 0.0 - 1.0

    for (let i = 0; i < octaves; i++) {
      let value = noise.perlin2((x / 100) * frequency, (y / 100) * frequency)
      total += value * amplitude
      maxValue += amplitude

      amplitude *= persistence
      frequency *= 2
    }

    return total / maxValue
  }
}
