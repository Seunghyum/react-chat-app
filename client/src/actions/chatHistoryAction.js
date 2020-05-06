const SET_CHATHISTORY = 'SET_CHATHISTORY'

function setChatHistory(chatHistory) {
  return { type: SET_CHATHISTORY, payload: chatHistory }
}

export default { SET_CHATHISTORY, setChatHistory }
