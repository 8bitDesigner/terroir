import React, { Component } from 'react'
import DiamondSquareGenerator from '../models/diamond-square.js'
import MidpointDisplacementGenerator from '../models/midpoint-displacement.js'
import Grid from '../components/grid'
import './app.css'

export default class App extends Component {
  constructor (props) {
    super(props)

    const size = 3
    const generator = 'Midpoint Displacement'
    const generators = {
      'Midpoint Displacement': MidpointDisplacementGenerator,
      'Diamond Square': DiamondSquareGenerator
    }

    this.state = {
      size,
      generator,
      generators,
      grid: new generators[generator](size),
      steppable: false,
      terrainMapping: true
    }

    this.state.grid.run()
  }

  setSize (event) {
    const size = parseInt(event.target.value, 10)
    const Generator = this.state.generators[this.state.generator]
    const grid = new Generator(size)
    grid.run()

    this.setState({ size, grid, steppable: false })
  }

  setTerrainMap (event) {
    const enabled = !!event.target.checked
    this.setState({terrainMapping: enabled})
  }

  setGenerator (event) {
    const name = event.target.value
    const Generator = this.state.generators[name]
    const grid = new Generator(this.state.size)

    this.setState({ generator: name, grid })
  }

  run () {
    const Generator = this.state.generators[this.state.generator]
    let grid = this.state.grid
    if (grid.queue.length) {
      grid.run()
    } else {
      grid = new Generator(this.state.size)
      grid.run()
    }

    this.setState({grid, steppable: false})
  }

  step () {
    const grid = this.state.grid
    grid.step()

    this.setState({steppable: grid.queue.length})
  }

  reset () {
    const Generator = this.state.generators[this.state.generator]
    const grid = new Generator(this.state.size)

    this.setState({ grid, steppable: true })
  }

  render () {
    return (
      <div className='container'>
        <div className='control-panel'>
          <h1 className='control-panel--title'>Terroir</h1>

          <div className='control-panel--control control-panel--control-group'>
            <label>Grid size</label>
            <select value={this.state.size} onChange={this.setSize.bind(this)}>
              <option value='1'>3x3</option>
              <option value='2'>5x5</option>
              <option value='3'>9x9</option>
              <option value='4'>17x17</option>
              <option value='5'>33x33</option>
              <option value='6'>65x65</option>
            </select>
          </div>

          <div className='control-panel--control control-panel--control-group'>
            <label>Algorithm</label>
            <select value={this.state.generator} onChange={this.setGenerator.bind(this)}>
              {Object.keys(this.state.generators).map(key =>
                <option value={key} key={key}>{key}</option>
              )}
            </select>
          </div>

          <div className='control-panel--control control-panel--control-group'>
            <label>Terrain Map</label>
            <input type='checkbox' checked={this.state.terrainMapping} onChange={this.setTerrainMap.bind(this)} />
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
          <Grid grid={this.state.grid} terrainMapping={this.state.terrainMapping} />
        </div>
      </div>
    )
  }
}
