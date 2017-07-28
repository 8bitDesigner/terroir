import {createElement} from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render} from 'react-dom'

import './css/index.css'
import App from './containers/app.jsx'
import reducer from './reducers/index.js'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducer)

render(
  createElement(Provider, {store}, createElement(App)),
  document.getElementById('root')
)
registerServiceWorker()
