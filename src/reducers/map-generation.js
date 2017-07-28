/* eslint-disable no-return-assign */

import DiamondSquareGenerator from '../models/diamond-square.js'
import MidpointDisplacementGenerator from '../models/midpoint-displacement.js'
import PerlinNoiseGenerator from '../models/perlin-noise.js'
import PerlinOctaveGenerator from '../models/perlin-octaves.js'

const initialState = () => {
  const size = 5
  const Generator = PerlinNoiseGenerator
  const grid = new Generator(size)

  grid.run()

  return {
    Generator,
    grid,
    size,
    terrainMapping: true
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

    default:
      break
  }

  if (regen) {
    state.grid = new state.Generator(state.size)
    state.grid.run()
  }

  return state
}

