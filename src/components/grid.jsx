/* eslint-disable no-multi-spaces */
import React, { Component } from 'react'

const types = {
  CITY: 7,
  SNOWY_MOUNTAIN: 6,
  MOUNTAIN: 5,
  FOREST: 4,
  GRASS: 3,
  SAND: 2,
  WATER: 1,
  DEEP_WATER: 0
}

export default class Grid extends Component {
  componentDidMount () {
    this.draw()
  }

  componentDidUpdate () {
    this.draw()
  }

  toType (value) {
    if (value <= 255 && value > 218) {
      return types.SNOWY_MOUNTAIN
    } else if (value <= 218 && value > 169) {
      return types.MOUNTAIN
    } else if (value <= 169 && value > 137) {
      return types.FOREST
    } else if (value <= 137 && value > 90) {
      return types.GRASS
    } else if (value <= 90 && value > 63) {
      return types.SAND
    } else if (value <= 63 && value > 26) {
      return types.WATER
    } else {
      return types.DEEP_WATER
    }
  }

  textFor (type) {
    if (!this.props.terrainMapping) {
      return null
    } else {
      switch (type) {
        case 6:  return {label: '^', color: 'white'}
        case 5:  return {label: '^', color: 'lightgray'}
        case 4:  return {label: '*', color: 'darkgreen'}
        default: return null
      }
    }
  }

  bgColorFor (cell) {
    if (!this.props.terrainMapping) {
      const v = cell.value || 0
      return `rgb(${v}, ${v}, ${v})`
    } else {
      switch (cell.type) {
        case 6: return 'lightgray'
        case 5: return 'slategrey'
        case 4: return 'green'
        case 3: return 'lawngreen'
        case 2: return 'khaki'
        case 1: return 'deepskyblue'
        case 0: return 'blue'
      }
    }
  }

  drawText (ctx, cell) {
    const {x, y, size, text} = cell
    const textSize = Math.floor(size * 0.85)

    if (text) {
      ctx.fillStyle = text.color
      ctx.textAlign = 'center'
      ctx.font = `${textSize}px monospace`
      ctx.fillText(text.label, x + (size / 2), y + (size * 0.8))
    }
  }

  drawBg (ctx, cell) {
    const {x, y, size} = cell
    ctx.fillStyle = this.bgColorFor(cell)
    ctx.fillRect(x, y, size, size)
  }

  drawFeature (ctx, cell, feature) {
    if (!feature || !this.props.terrainMapping) { return }

    const {x, y, size} = cell
    const tile =
      feature === 'city' ? {symbol: '🏘', color: 'white'}
    : feature === 'lair' ? {symbol: '🗻', color: 'black'}
    : null

    if (tile) {
      ctx.fillStyle = tile.color
      ctx.textAlign = 'center'
      ctx.font = `${size}px monospace`
      ctx.fillText(tile.symbol, x + (size / 2), y + (size))
    }
  }

  drawAvatar (ctx, size, {x, y}) {
    x = (x * size) + (size / 2)
    y = (y * size) + (size * 0.8)

    ctx.textAlign = 'center'
    ctx.fillStyle = 'white'
    ctx.font = `${size}px monospace`
    ctx.fillText('@', x, y)
  }

  drawDragon (ctx, size, {x, y}) {
    x = (x * size) + (size / 2)
    y = (y * size) + (size * 0.8)

    ctx.textAlign = 'center'
    ctx.fillStyle = 'red'
    ctx.font = `${size}px monospace`
    ctx.fillText('D', x, y)
  }

  draw () {
    const ctx = this.refs.canvas.getContext('2d')
    const {avatar, dragon, features, grid} = this.props
    const gridSize = grid.size
    const cellSize = this.refs.canvas.width / gridSize
    const toCell = (value, idx) => {
      const type = this.toType(value)
      return {
        value,
        type,
        text: this.textFor(type),
        features: [features[idx]],
        x: (idx % gridSize) * cellSize,
        y: Math.floor(idx / gridSize) * cellSize,
        size: cellSize
      }
    }

    this.props.grid.cells
    .map(toCell)
    .forEach(cell => {
      this.drawBg(ctx, cell)
      this.drawText(ctx, cell)
      cell.features.forEach(feature => {
        this.drawFeature(ctx, cell, feature)
      })
    })

    this.drawAvatar(ctx, cellSize, avatar)
    this.drawDragon(ctx, cellSize, dragon)
  }

  render () {
    const {grid} = this.props

    // Find a size for our canvas so we can render terrain tiles on int
    // boundaries, and then scale the canvas in CSS for fine-grained control
    const size = {
      3: 654, // x 218
      5: 650, // x 130
      9: 657, // x 73
      17: 663, // x 39
      33: 660, // x 20
      65: 650, // x 10
      129: 645 // x 3
    }[grid.size]

    return <canvas width={size} height={size} ref='canvas' />
  }
}

