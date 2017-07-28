/* eslint-disable no-return-assign */

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

  return features
}

export default function (state, action) {
  const {type} = action

  if (state.grid && !state.features) {
    state = {...state, features: getFeatures(state.grid)}
  }

  switch (type) {
    case 'SET_SIZE':
    case 'SET_GENERATOR':
    case 'SET_TERRAINMAP':
    case 'RUN':
      return {...state, features: getFeatures(state.grid)}

    default:
      return state
  }
}

