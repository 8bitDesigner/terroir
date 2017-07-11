const rand = max => Math.floor(Math.random() * max)

export class Grid {
  constructor (width, height) {
    this.width = width
    this.height = height

    this.reset()
  }

  reset () {
    this.rows = []

    for (let i = 0; i < this.height; i++) {
      this.rows[i] = []
      for (let j = 0; j < this.width; j++) {
        this.rows[i][j] = null
      }
    }
  }

  run () {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.rows[i][j] = rand(255)
      }
    }
  }
}
