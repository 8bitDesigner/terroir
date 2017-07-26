/* eslint-disable no-return-assign */
import React, { Component } from 'react'
import DiamondSquareGenerator from '../models/diamond-square.js'
import MidpointDisplacementGenerator from '../models/midpoint-displacement.js'
import PerlinNoiseGenerator from '../models/perlin-noise.js'
import PerlinOctaveGenerator from '../models/perlin-octaves.js'
import Grid from '../components/grid'
import {City, Lair} from '../components/features.js'

export default class App extends Component {
  constructor (props) {
    super(props)

    const size = 5
    const generator = 'Perlin Noise'
    const generators = {
      'Midpoint Displacement': MidpointDisplacementGenerator,
      'Diamond Square': DiamondSquareGenerator,
      'Perlin Noise': PerlinNoiseGenerator,
      'Perlin Octaves': PerlinOctaveGenerator
    }

    const grid = new generators[generator](size)
    const features = this.getFeatures(grid)

    this.state = {
      size,
      generator,
      generators,
      features,
      grid,
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
    const features = this.getFeatures(grid)

    this.setState({ size, grid, features, steppable: false })
  }

  setTerrainMap (event) {
    const enabled = !!event.target.checked
    this.setState({terrainMapping: enabled})
  }

  setGenerator (event) {
    const name = event.target.value
    const Generator = this.state.generators[name]
    const grid = new Generator(this.state.size)
    grid.run()

    const features = this.getFeatures(grid)
    this.setState({ generator: name, grid, features })
  }

  run () {
    const Generator = this.state.generators[this.state.generator]
    let grid = this.state.grid
    let features

    if (grid.queue.length) {
      grid.run()
    } else {
      grid = new Generator(this.state.size)
      grid.run()
      features = this.getFeatures(grid)
    }

    this.setState({grid, features, steppable: false})
  }

  getFeatures (grid = this.state.grid) {
    const terrain = grid.cells
    const features = new Array(grid.size * grid.size)
    const set = (x, y, v, arr) => arr[y * grid.size + x] = v

    features.fill(0)

    const sample = n => arr => {
      const lookup = () => arr[Math.floor(Math.random() * arr.length)]
      const found = []

      for (let i = 0; i < n; i++) {
        found.push(lookup())
      }

      return found
    }

    const valid = terrain.map((v, idx) => ({
      x: idx % grid.size,
      y: Math.floor(idx / grid.size),
      v
    }))
    .filter(cell => cell.v < 169 && cell.v > 63)

    sample(2)(valid).forEach(cell => set(cell.x, cell.y, 'city', features))
    sample(1)(valid).forEach(cell => set(cell.x, cell.y, 'lair', features))

    console.log(sample(2)(valid), features.length)
    return features
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
              <option value='7'>129x129</option>
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
          <Grid grid={this.state.grid} features={this.state.features} terrainMapping={this.state.terrainMapping}>
            {Lair(2)}
            {City(1)}
          </Grid>
        </div>
      </div>
    )
  }
}
