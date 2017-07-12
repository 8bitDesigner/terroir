import React, { Component } from 'react'
import Cell from '../components/cell'

export default class Grid extends Component {
  render () {
    const {cells, size} = this.props.grid

    return (
      <div className='grid'>
        {cells.map((value, idx) =>
          <Cell value={value} key={idx} rowWidth={size} terrainMapping={this.props.terrainMapping} />
        )}
      </div>
    )
  }
}

