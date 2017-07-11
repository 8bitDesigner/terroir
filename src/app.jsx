import React, { Component } from 'react'
import DiamondSquareGenerator from './models/diamond-square.js'
import './app.css'

class Grid extends Component {
  componentWillMount () {
    this.grid = new DiamondSquareGenerator(this.props.width)
    this.grid.run()
  }

  render () {
    return (
      <div className='grid'>
        {this.grid.rows.map(row => {
          <div className='grid-row'>
            {row.map(cell => <Cell value={cell} />)}
          </div>
        })}
      </div>
    )
  }
}

class Cell extends Component {
  render () {
    const v = this.props.v
    const style = {background: `rgb(${v}, ${v}, ${v})`}
    return <div className='grid-cell' style={style} />
  }
}

export default class App extends Component {
  render () {
    return <Grid width={100} height={100} />
  }
}
