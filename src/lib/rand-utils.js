export const rand = (min = 0, max = 255) => {
  return Math.random() * (max - min) + min
}

export const jitter = (value, range = 1) => ((Math.random() - 0.5) * range) + value

export const floor = Math.floor.bind(Math)

export const sum = arr => arr.reduce((a, b) => a + b, 0)

export const avg = (...args) => sum(args) / args.length
