/* eslint-disable no-return-assign */
const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)
const wo = (arr, el) => arr.filter(i => i !== el)

export class Grid {
  constructor (width, height) {
    this.width = width
    this.height = height

    this.reset()
  }

  reset () {
    this.cursor = [0, 0]

    this.rows = []
    for (let i = 0; i < this.height; i++) {
      this.rows[i] = []
      for (let j = 0; j < this.width; j++) {
        this.rows[i][j] = null
      }
    }
  }

  run () {
    this.randomizeCursor()
    this.walk(1000, (grid, [x, y]) => grid[y][x] = rand(0, 125))
    this.randomizeCursor()
    this.walk(1000, (grid, [x, y]) => grid[y][x] = rand(126, 255))
  }

  randomizeCursor () {
    this.cursor = [
      rand(this.rows[0].length),
      rand(this.rows.length)
    ]
  }

  has (x, y) {
    return typeof this.rows[y] !== 'undefined' && typeof this.rows[y][x] !== 'undefined'
  }

  go (direction) {
    let [x, y] = this.cursor

    switch (direction) {
      case 'u': return this.cursor[1] = this.has(x, y - 1) ? y - 1 : y
      case 'd': return this.cursor[1] = this.has(x, y + 1) ? y + 1 : y
      case 'l': return this.cursor[0] = this.has(x - 1, y) ? x - 1 : x
      case 'r': return this.cursor[0] = this.has(x + 1, y) ? x + 1 : x
    }
  }

  walk (steps, fn) {
    const directions = ['u', 'd', 'l', 'r']
    let count = 0
    let direction, lastDirection

    while (count < steps) {
      direction = wo(directions, lastDirection)[rand(3)]
      lastDirection = direction
      this.go(direction)
      fn(this.rows, this.cursor)
      count++
    }
  }
}
