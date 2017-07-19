export default class AbstractGenerator {
  constructor (exponent, initialValue) {
    this.exponent = exponent
    this.size = 2 ** exponent + 1
    this.last = this.size - 1
    this.cells = new Array(this.size * this.size)

    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = initialValue
    }
  }

  has (x, y) {
    return (x >= 0 && x <= this.last) && (y >= 0 && y <= this.last)
  }

  get (x, y) {
    if (this.has(x, y)) {
      return this.cells[y * this.size + x]
    }
  }

  set (x, y, v) {
    if (this.has(x, y)) {
      this.cells[y * this.size + x] = v
    }
  }

  normalize () {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] > 255) { this.cells[i] = 255 }
      if (this.cells[i] < 0) { this.cells[i] = 0 }
    }
  }

  reset () {
    this.queue = []
  }

  step () {
    if (this.queue.length) {
      this.queue.shift()()
      this.normalize()
    }
  }

  run () {
    while (this.queue.length) { this.step() }
  }
}
