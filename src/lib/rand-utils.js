const sum = (a, b) => a + b
const isValid = n => (n || n === 0) && !isNaN(n)

export const avg = (...args) => {
  const valid = args.filter(isValid)
  return valid.reduce(sum, 0) / valid.length
}

export const rand = (min = 0, max = 255) => {
  return Math.random() * (max - min) + min
}

export const jitter = (value, range = 1) => ((Math.random() - 0.5) * range) + value

export const floor = Math.floor.bind(Math)
