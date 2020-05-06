import allActions from '../actions'

const { SET_CHATROOMS } = allActions.chatroomsAction

const setChatrooms = (state = [], action) => {
  switch (action.type) {
    case SET_CHATROOMS:
      return action.payload
    default:
      return state
  }
}
export default setChatrooms
