const chalk = require('chalk')

/* eslint-disable no-return-assign */
const sample = arr => arr[Math.floor(Math.random() * arr.length)]

class Grid {
  constructor (width, height) {
    this.grid = []
    for (let i = 0; i < height; i++) {
      this.grid[i] = []
      for (let j = 0; j < width; j++) {
        this.grid[i][j] = new GridCell(j, i)
      }
    }
  }

  get ([x, y]) {
    if (this.grid[y] && this.grid[y][x]) {
      return this.grid[y][x]
    } else {
      return null
    }
  }

  sample () {
    return sample(sample(this.grid))
  }

  toString () {
    return this.grid
    .map(r => r.map(c => c.toString()).join(' '))
    .join('\n')
  }
}

class GridCell {
  constructor (x, y, symbol = chalk.white('.')) {
    this.x = x
    this.y = y
    this.symbol = symbol
  }

  toString () {
    return this.symbol
  }
}

class MapGrid {
  constructor (grid) {
    this.grid = grid
    this.cursor = [0, 0]
  }

  randomizeCursor () {
    let {x, y} = this.grid.sample()
    this.cursor = [x, y]
  }

  has (direction) {

  }

  go (direction) {

  }

  up () {
    let [x, y] = this.cursor
    this.cursor = (this.grid.get([x - 1, y])) ? [x - 1, y] : [x, y]
    return this.grid.get(this.cursor)
  }

  down () {
    let [x, y] = this.cursor
    this.cursor = (this.grid.get([x + 1, y])) ? [x + 1, y] : [x, y]
    return this.grid.get(this.cursor)
  }

  left () {
    let [x, y] = this.cursor
    this.cursor = (this.grid.get([x, y - 1])) ? [x, y - 1] : [x, y]
    return this.grid.get(this.cursor)
  }

  right () {
    let [x, y] = this.cursor
    this.cursor = (this.grid.get([x, y + 1])) ? [x, y + 1] : [x, y]
    return this.grid.get(this.cursor)
  }

  walk (steps, fn) {
    const seen = []
    const directions = [
      this.up.bind(this),
      this.down.bind(this),
      this.left.bind(this),
      this.right.bind(this)
    ]

    const move () {
      let el = sample(directions)()

    }
    const isValid =() => {

    }

    let direction = null
    let step = 0

    while (seen.length < steps) {
      let direction
      while (!isValid(direction)) {

      }

      let el = move()
      step = step + 1
      if (!seen.includes(el)) {
        seen.push(el)
        fn(el, step)
      }
    }
  }
}

const map = new MapGrid(new Grid(20, 20))
map.randomizeCursor()
map.walk(100, (cell, step) => cell.symbol = chalk.green('*'))
map.randomizeCursor()
map.walk(100, (cell, step) => cell.symbol = chalk.yellow('^'))
console.log(map.grid.toString())
