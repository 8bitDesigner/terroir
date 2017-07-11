import React, { Component } from 'react'
import DiamondSquareGenerator from '../models/diamond-square.js'
import Grid from '../components/grid'
import './app.css'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.width = 30
  }

  componentWillMount () {
    this.grid = new DiamondSquareGenerator(this.width)
    this.reset()
  }

  setWidth (event) {
    const value = parseInt(event.target.value, 10)

    if (value < 101 && value > 9) {
      this.grid.size = value
      this.reset()
    } else {
      console.log('barf', value)
    }
  }

  reset () {
    this.grid.reset()
    this.grid.run()

    this.setState({rows: this.grid.rows})
  }

  render () {
    return (
      <div className='container'>
        <div className='control-panel'>
          <h1 className='control-panel--title'>Terroir</h1>

          <div className='control-panel--control'>
            <label>Grid size</label>
            <input type='number' min='10' max='100' step='10' value={this.grid.size} onChange={this.setWidth.bind(this)} />
          </div>

          <div className='control-panel--control'>
            <button className='control-panel--reset' onClick={this.reset.bind(this)}>Reset</button>
          </div>
        </div>

        <div className='grid-container'>
          <Grid width={100} height={100} rows={this.state.rows} />
        </div>
      </div>
    )
  }
}
