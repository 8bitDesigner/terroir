import React, { Component } from 'react'
import Cell from '../components/cell'

export default class Grid extends Component {
  render () {
    return (
      <div className='grid'>
        {this.props.rows.map((row, idx) => {
          return (
            <div className='grid-row' key={idx}>
              {row.map((cell, idx) => <Cell value={cell} key={idx} rowWidth={row.length} />)}
            </div>
          )
        })}
      </div>
    )
  }
}

