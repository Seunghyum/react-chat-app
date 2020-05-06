const SET_CHATROOMS = 'SET_CHATROOMS'

function setChatrooms(chatrooms) {
  return { type: SET_CHATROOMS, payload: chatrooms }
}

export default { SET_CHATROOMS, setChatrooms }
