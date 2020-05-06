import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Menu from './Menu'

export default {
  title: 'Menu',
}

export function defaultView() {
  return (
    <Router>
      <Menu />
    </Router>
  )
}
