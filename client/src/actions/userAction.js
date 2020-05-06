const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

function login(user) {
  return { type: LOGIN, payload: user }
}

function logout(user) {
  return { type: LOGOUT, payload: user }
}

export default { LOGIN, LOGOUT, login, logout }
