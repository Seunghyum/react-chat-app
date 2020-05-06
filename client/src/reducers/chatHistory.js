import allActions from '../actions'

const { SET_CHATHISTORY } = allActions.chatHistoryAction

const defaultState = {
  user: {
    name: null,
    lastName: null,
    statusText: null,
    image: null,
  },
  event: null,
  message: null,
}

const setChatHistory = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CHATHISTORY:
      return action.payload
    default:
      return state
  }
}
export default setChatHistory
