import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './containers/app'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(React.createElement(App), document.getElementById('root'))
registerServiceWorker()
