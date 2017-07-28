/* eslint-disable no-return-assign */

import DiamondSquareGenerator from '../models/diamond-square.js'
import MidpointDisplacementGenerator from '../models/midpoint-displacement.js'
import PerlinNoiseGenerator from '../models/perlin-noise.js'
import PerlinOctaveGenerator from '../models/perlin-octaves.js'

const getFeatures = (grid) => {
  const terrain = grid.cells
  const features = new Array(grid.size * grid.size)
  const set = (x, y, v, arr) => arr[y * grid.size + x] = v

  features.fill(0)

  const sample = n => arr => {
    const lookup = () => arr[Math.floor(Math.random() * arr.length)]
    const found = []

    for (let i = 0; i < n; i++) {
      found.push(lookup())
    }

    return found
  }

  const valid = terrain.map((v, idx) => ({
    x: idx % grid.size,
    y: Math.floor(idx / grid.size),
    v
  }))
  .filter(cell => cell.v < 169 && cell.v > 63)

  sample(2)(valid).forEach(cell => set(cell.x, cell.y, 'city', features))
  sample(1)(valid).forEach(cell => set(cell.x, cell.y, 'lair', features))

  console.log(sample(2)(valid), features.length)
  return features
}

const initialState = () => {
  const size = 6
  const Generator = PerlinNoiseGenerator
  const grid = new Generator(size)

  grid.run()

  return {
    terrainMapping: true,
    size,
    Generator,
    features: getFeatures(grid),
    grid
  }
}

export const generators = {
  'Midpoint Displacement': MidpointDisplacementGenerator,
  'Diamond Square': DiamondSquareGenerator,
  'Perlin Noise': PerlinNoiseGenerator,
  'Perlin Octaves': PerlinOctaveGenerator
}

export default function (state = initialState(), action) {
  const {type} = action
  let regen = false

  switch (type) {
    case 'SET_SIZE':
      state = {...state, size: action.size}
      regen = true
      break

    case 'SET_GENERATOR':
      state = {...state, Generator: generators[action.generator]}
      regen = true
      break

    case 'SET_TERRAINMAP':
      state = {...state, terrainMapping: action.terrainMapping}
      break

    case 'RUN':
      regen = true
      state = {...state}
      break
  }

  if (regen) {
    state.grid = new state.Generator(state.size)
    state.grid.run()
    state.features = getFeatures(state.grid)
  }

  return state
}
