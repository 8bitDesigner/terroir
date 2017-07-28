const validTerrain = terrain => terrain > 63 && terrain <= 169

const avatarStart = (grid) => {
  const valid = grid.cells.map((value, idx) => {
    return {
      x: idx % grid.size,
      y: Math.floor(idx / grid.size),
      value
    }
  }).filter(cell => validTerrain(cell.value))

  return valid[Math.floor(Math.random() * valid.length)]
}

export default function (state = {}, action) {
  const {type, event} = action

  if (!state.avatar || type === 'RUN') {
    const avatar = avatarStart(state.grid)
    console.log(avatar)
    return {...state, avatar, dragon: [0, 0]}
  } else if (type === 'KEYDOWN') {
    const keys = [37, 38, 39, 40]
    const grid = state.grid
    let {x, y} = state.avatar

    if (keys.includes(event.which)) {
      event.preventDefault()
    }

    switch (event.which) {
      case 37: // left
        x = (x - 1 < 0) ? 0 : x - 1
        break

      case 38: // up
        y = (y - 1 < 0) ? 0 : y - 1
        break

      case 39: // right
        x = (x + 1 > grid.size) ? grid.size : x + 1
        break

      case 40: // down
        y = (y + 1 > grid.size) ? grid.size : y + 1
        break

      default:
    }

    if (validTerrain(grid.get(x, y))) {
      return {...state, avatar: {x, y}}
    } else {
      return state
    }
  } else {
    return state
  }
}
