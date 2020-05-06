import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Chat from './containers/Chat'
import Login from './containers/Login'
import NotFound from './statics/NotFound'

// routers
import AuthenticatedRoute from './routers/AuthenticatedRoute'

function App() {
  const currentUser = useSelector(state => state.currentUser)

  return (
    <Router>
      <Switch>
        <AuthenticatedRoute exact path={['/', '/chats']} component={Chat} {...currentUser} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
export default App
