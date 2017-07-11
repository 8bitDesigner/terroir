import React, { Component } from 'react'
import DiamondSquareGenerator from '../models/diamond-square.js'
import Grid from '../components/grid'
import './app.css'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.size = 33
  }

  componentWillMount () {
    this.grid = new DiamondSquareGenerator(this.size)
    this.reset()
  }

  setSize (event) {
    this.size = parseInt(event.target.value, 10)
    this.grid.size = this.size
    this.reset()
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
            <select value={this.size} onChange={this.setSize.bind(this)}>
              <option value='3'>3</option>
              <option value='5'>5</option>
              <option value='8'>9</option>
              <option value='17'>17</option>
              <option value='33'>33</option>
              <option value='65'>65</option>
              <option value='129'>129</option>
            </select>
          </div>

          <div className='control-panel--control'>
            <button className='control-panel--reset' onClick={this.reset.bind(this)}>Reset</button>
          </div>
        </div>

        <div className='grid-container'>
          <Grid rows={this.state.rows} />
        </div>
      </div>
    )
  }
}
