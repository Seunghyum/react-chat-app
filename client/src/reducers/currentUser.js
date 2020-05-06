import allActions from '../actions'

const { LOGIN } = allActions.userAction
const { LOGOUT } = allActions.userAction

const defaultState = {
  currentUser: {},
  socketId: null,
  isLoggedIn: false,
}

const setCurrentUser = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        currentUser: action.payload.user,
        socketId: action.payload.socketId,
        isLoggedIn: true,
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default setCurrentUser
