import io from 'socket.io-client'

const socket = () => {
  const socketClient = io.connect(`http://${process.env.HOSTNAME}:${process.env.SOCKET_PORT}`)

  function registerHandler(onMessageReceived, onTypingReceived) {
    socketClient.on('typing', onTypingReceived)
    socketClient.on('message', onMessageReceived)
  }

  function unregisterHandler() {
    socketClient.off('message')
    socketClient.off('typing')
  }

  function registerChatroomStatusHandler(onChangeChatroomStatus) {
    socketClient.on('chatrooms', onChangeChatroomStatus)
  }

  function unregisterChatroomStatusHandler() {
    socketClient.off('chatrooms')
  }

  function registerAvailableUserHandler(onChangeAvailableUser) {
    socketClient.on('availableUsers', onChangeAvailableUser)
  }

  function unregisterAvailableUserHandler() {
    socketClient.off('availableUsers')
  }

  function logoutHandler() {
    unregisterChatroomStatusHandler()
    unregisterHandler()
  }

  function register(name, cb) {
    socketClient.emit('register', name, cb)
  }

  function signUp(userName, cb) {
    socketClient.emit('signUp', userName, cb)
  }

  // eslint-disable-next-line no-shadow
  function message(props = {}, cb) {
    socketClient.emit('message', props, cb)
  }

  function typing(props = {}, cb) {
    socketClient.emit('typing', props, cb)
  }

  function getChatrooms(cb) {
    socketClient.emit('chatrooms', null, cb)
  }

  function getAvailableUsers(cb) {
    socketClient.emit('availableUsers', null, cb)
  }

  socketClient.on('error', err => {
    console.log('received socketClient error: ', err)
  })

  return {
    socketClient,
    register,
    message,
    logoutHandler,
    typing,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterHandler,
    registerChatroomStatusHandler,
    unregisterChatroomStatusHandler,
    registerAvailableUserHandler,
    unregisterAvailableUserHandler,
    signUp,
  }
}

export default socket()
