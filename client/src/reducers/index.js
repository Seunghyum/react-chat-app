import { combineReducers } from 'redux'
import currentUser from './currentUser'
import chatroom from './chatroom'
import chatrooms from './chatrooms'
import chatHistory from './chatHistory'

export default combineReducers({
  currentUser,
  chatroom,
  chatHistory,
  chatrooms,
})
