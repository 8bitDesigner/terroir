import React, { Component } from 'react'
import DiamondSquareGenerator from '../models/diamond-square.js'
import Grid from '../components/grid'
import './app.css'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      size: 33,
      steppable: false
    }
  }

  componentWillMount () {
    this.grid = new DiamondSquareGenerator(this.state.size)
    this.grid.reset()
    this.run()
  }

  setSize (event) {
    this.state.size = parseInt(event.target.value, 10)
    this.grid.size = this.state.size
    this.run()
  }

  run () {
    this.grid.reset()
    this.grid.run()
    this.setState({rows: this.grid.rows})
  }

  step () {
    this.grid.step()
    this.setState({rows: this.grid.rows})
  }

  reset () {
    this.grid.reset()
    this.setState({
      rows: this.grid.rows,
      steppable: true
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='control-panel'>
          <h1 className='control-panel--title'>Terroir</h1>

          <div className='control-panel--control control-panel--control-group'>
            <label>Grid size</label>
            <select value={this.state.size} onChange={this.setSize.bind(this)}>
              <option value='3'>3</option>
              <option value='5'>5</option>
              <option value='8'>9</option>
              <option value='17'>17</option>
              <option value='33'>33</option>
              <option value='65'>65</option>
              <option value='129'>129</option>
            </select>
          </div>

          <div className='control-panel--control control-panel--control-group'>
            <button
              className='control-panel--step'
              onClick={this.step.bind(this)}
              disabled={!this.state.steppable}
            >Step</button>

            <button className='control-panel--run' onClick={this.run.bind(this)}>Run</button>

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
