import React, { useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import allActions from '../actions'
import socket from '../modules/socket'

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isLoggedIn, currentUser, socketId } = rest

  useEffect(() => {
    // 페이지 새로고침 시 다시 접속
    if (socketId !== null && socketId !== socket.socketClient.id) {
      socket.register(currentUser.name, err => {
        if (err && err.result === false) {
          console.log('errr occured in register : ', err)
          dispatch(allActions.userAction.logout())
          history.push('/login')
        }
      })
    }
  }, [])

  return (
    <Route
      {...rest}
      render={props => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }}
    />
  )
}

export default AuthenticatedRoute
