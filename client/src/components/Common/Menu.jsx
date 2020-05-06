import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import socket from '../../modules/socket'
import allActions from '../../actions'

function Menu() {
  const dispatch = useDispatch()
  const history = useHistory()
  const logout = e => {
    e.preventDefault()
    dispatch(allActions.userAction.logout())
    socket.logoutHandler()
    history.push('/login')
    window.location.reload()
  }

  return (
    <nav className="menu">
      <ul className="items">
        <Link to="/" className="item item-active">
          <i className="fa fa-commenting" aria-hidden="true" />
        </Link>
        <a href="/" onClick={logout} className="item item">
          <i className="fa fa-sign-out" aria-hidden="true" />
        </a>
      </ul>
    </nav>
  )
}
export default Menu
