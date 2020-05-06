import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import socket from '../modules/socket'
import allActions from '../actions'
import UserListItem from '../components/login/UserListItem'

function Login() {
  const [availableUsers, setAvailableUsers] = useState([])
  const [customUser, setCustomUser] = useState('')
  const { isLoggedIn } = useSelector(state => state.currentUser)
  const history = useHistory()
  const dispatch = useDispatch()

  const onClickUserSelection = user => {
    socket.register(user.name, err => {
      if (err && err.result === false) {
        console.log('errr occured in register : ', err)
        return window.location.reload()
      } else {
        const socketId = socket.socketClient.id
        dispatch(allActions.userAction.login({ user, socketId }))
        return history.push('/chats')
      }
    })
  }

  const onChangeInput = e => {
    setCustomUser(e.target.value)
  }

  const onSignUpCurrentUser = (err, user) => {
    if (err) return console.log('errr occured in sign up')
    onClickUserSelection(user)
  }

  const onSetCustomUser = () => {
    if (customUser === null) return
    setCustomUser('')
    socket.signUp(customUser, onSignUpCurrentUser)
  }

  const onChangeAvailableUser = entry => {
    setAvailableUsers(entry)
  }

  useEffect(() => {
    if (isLoggedIn) return history.push('/chats')

    socket.getAvailableUsers((err, users) => {
      setAvailableUsers(users)
    })

    socket.registerAvailableUserHandler(onChangeAvailableUser)
    return () => {
      socket.unregisterAvailableUserHandler()
    }
  }, [])

  return (
    <div className="login">
      <div className="blurred-box">
        <div className="user-login-box">
          <p className="section-title">만들어둔 계정으로 입장하기</p>
          <div className="user-list">
            {availableUsers.map(auser => {
              return <UserListItem user={auser} onClickUserSelection={onClickUserSelection} key={auser.id} />
            })}
          </div>
          <p className="section-title">새로운 계정으로 입장하기</p>
          <div className="user-icon-wrapper">
            <div className="user-icon" />
          </div>
          <div className="user-name">{customUser}</div>
          <input
            className="user-password"
            type="text"
            onChange={onChangeInput}
            value={customUser}
            placeholder="Press Enter"
            onKeyPress={e => (e.key === 'Enter' ? onSetCustomUser() : null)}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
