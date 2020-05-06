const SET_CHATROOM = 'SET_CHATROOM'

function setChatroom(chatroom) {
  return { type: SET_CHATROOM, payload: chatroom }
}

export default { SET_CHATROOM, setChatroom }
