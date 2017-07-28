/* eslint-disable no-return-assign */
import React, { Component } from 'react'
import {generators} from '../reducers/index'
import {connect} from 'react-redux'
import Grid from '../components/grid'

class App extends Component {
  setSize (event) {
    const size = parseInt(event.target.value, 10)
    this.props.dispatch({type: 'SET_SIZE', size})
  }

  setTerrainMap (event) {
    const terrainMapping = !!event.target.checked
    this.props.dispatch({type: 'SET_TERRAINMAP', terrainMapping})
  }

  setGenerator (event) {
    const generator = event.target.value
    this.props.dispatch({type: 'SET_GENERATOR', generator})
  }

  run () {
    this.props.dispatch({type: 'RUN'})
  }

  render () {
    const {size, Generator, terrainMapping, grid, features} = this.props
    const currentGenerator = Object.keys(generators).find(key => {
      return generators[key] === Generator
    })

    return (
      <div className='container'>
        <div className='control-panel'>
          <h1 className='control-panel--title'>Terroir</h1>

          <div className='control-panel--control control-panel--control-group'>
            <label>Grid size</label>
            <select value={size} onChange={this.setSize.bind(this)}>
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
            <select value={currentGenerator} onChange={this.setGenerator.bind(this)}>
              {Object.keys(generators).map(key =>
                <option value={key} key={key}>{key}</option>
              )}
            </select>
          </div>

          <div className='control-panel--control control-panel--control-group'>
            <label>Terrain Map</label>
            <input type='checkbox' checked={terrainMapping} onChange={this.setTerrainMap.bind(this)} />
          </div>

          <div className='control-panel--control control-panel--control-group'>
            <button className='control-panel--run' onClick={this.run.bind(this)}>Run</button>
          </div>
        </div>

        <div className='grid-container'>
          <Grid grid={grid} features={features} terrainMapping={terrainMapping} />
        </div>
      </div>
    )
  }
}

export default connect(state => state)(App)
