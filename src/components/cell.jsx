/* eslint-disable no-multi-spaces */
import React, { Component } from 'react'

const types = {
  SNOWY_MOUNTAIN: 'SNOWY_MOUNTAIN',
  MOUNTAIN: 'MOUNTAIN',
  FOREST: 'FOREST',
  GRASS: 'GRASS',
  SAND: 'SAND',
  WATER: 'WATER',
  DEEP_WATER: 'DEEP_WATER'
}

export default class Cell extends Component {
  constructor (props) {
    super(props)
    this.state = {type: this.typeFor(props.value)}
  }

  componentWillReceiveProps (nextProps) {
    this.setState({type: this.typeFor(nextProps.value)})
  }

  typeFor (value) {
    if (value <= 255 && value > 218) {
      return types.SNOWY_MOUNTAIN
    } else if (value <= 218 && value > 169) {
      return types.MOUNTAIN
    } else if (value <= 169 && value > 137) {
      return types.FOREST
    } else if (value <= 137 && value > 100) {
      return types.GRASS
    } else if (value <= 100 && value > 63) {
      return types.SAND
    } else if (value <= 63 && value > 26) {
      return types.WATER
    } else {
      return types.DEEP_WATER
    }
  }

  get text () {
    switch (this.state.type) {
      case 'SNOWY_MOUNTAIN': return {label: '^', color: 'white'}
      case 'MOUNTAIN':       return {label: '^', color: 'lightgray'}
      case 'FOREST':         return {label: '*', color: 'darkgreen'}
      default:               return {label: ' ', color: 'transparent'}
    }
  }

  get color () {
    switch (this.state.type) {
      case 'SNOWY_MOUNTAIN': return 'lightgray'
      case 'MOUNTAIN':       return 'slategrey'
      case 'FOREST':         return 'green'
      case 'GRASS':          return 'lawngreen'
      case 'SAND':           return 'khaki'
      case 'WATER':          return 'deepskyblue'
      default:               return 'blue'
    }
  }

  render () {
    const {label, color: textColor} = this.text
    const style = {
      color: textColor,
      background: this.color,
      paddingBottom: `${100 / this.props.rowWidth}%`
    }

    return (
      <div className='grid-cell' style={style} data-value={this.props.value}>
        <span className='grid-cell--label'>{label}</span>
      </div>
    )
  }
}

