import React from 'react'
import ReactDOM from 'react-dom'
import 'reset-css'
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import './assets/styles/index.scss'

import { Provider } from 'react-redux'

import configureStore from './store'

import App from './App'

const { store } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
