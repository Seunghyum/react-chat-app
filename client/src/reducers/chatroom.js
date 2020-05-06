import allActions from '../actions'

const { SET_CHATROOM } = allActions.chatroomAction

const defaultState = {
  id: null,
  name: null,
  photo: null,
  numMembers: null,
}

const setChatroom = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CHATROOM:
      return action.payload
    default:
      return state
  }
}

export default setChatroom
