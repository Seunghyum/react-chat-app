import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatMessage from '../components/chats/ChatMessage'
import ChatEventMessage from '../components/chats/ChatEventMessage'
import ChatMessageInput from '../components/chats/ChatMessageInput'
import Menu from '../components/common/Menu'
import socket from '../modules/socket'
import allActions from '../actions'
import ChatroomListItem from '../components/chats/ChatroomListItem'
import UserProfileTooltip from '../components/chats/UserProfileTooltip'
import ChatSearchInput from '../components/chats/ChatSearchInput'
import ChatroomAdd from '../components/chats/ChatroomAdd'
import ChatTypingAlert from '../components/chats/ChatTypingAlert'
import ChatNewMessageAlert from '../components/chats/ChatNewMessageAlert'

function Chat() {
  const [messages, setMessages] = useState([])
  const [holding, setHolding] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [typing, setTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState([])
  const [timeoutForTyping, setTimeoutForTyping] = useState()
  const { currentUser } = useSelector(state => state.currentUser)
  const chatHistory = useSelector(state => state.chatHistory)
  const currentChatroom = useSelector(state => state.chatroom)
  const chatrooms = useSelector(state => state.chatrooms)
  const dispatch = useDispatch()
  let lastMessageUserId = null

  const onChangeChatroomStatus = entry => {
    dispatch(allActions.chatroomsAction.setChatrooms(entry))
  }

  const onMessageReceived = entry => {
    const ch = { user: currentUser, ...entry }
    dispatch(allActions.chatHistoryAction.setChatHistory(ch))
  }

  const onTypingReceived = tys => {
    setTypingUsers(tys)
  }

  const onEnterChatroom = chatroom => {
    const chatroomName = chatroom.name
    return socket.message({ chatroomName, userName: currentUser.name, type: 'join' }, (err, ch) => {
      if (err) return console.error(err)
      dispatch(allActions.chatHistoryAction.setChatHistory(ch))
      return socket.registerHandler(onMessageReceived, onTypingReceived)
    })
  }

  const onLeaveChatromm = chatroom => {
    const { name } = chatroom
    socket.message({ chatroomName: name, type: 'leave' }, err => {
      if (err) return console.error(err)
      dispatch(allActions.chatHistoryAction.setChatHistory([]))
      return socket.unregisterHandler()
    })
  }

  const onClickChatroom = chatroom => {
    if (currentChatroom.id) onLeaveChatromm(currentChatroom)
    dispatch(allActions.chatroomAction.setChatroom(chatroom))
    onEnterChatroom(chatroom)
  }

  const renderMessages = messages.map((t, i) => {
    const chat = t
    const messageLastIndex = messages.length - 1
    chat.isTextOnly = lastMessageUserId === chat.user.id
    chat.isResponse = currentUser.id === chat.user.id
    chat.isLast = messageLastIndex === i
    lastMessageUserId = chat.user.id
    if (chat.event) return <ChatEventMessage {...chat} key={`event-${chat.createdAt}${Math.random()}`} />
    else if (chat.message) return <ChatMessage {...chat} key={`message-${chat.createdAt}`} />
    return false
  })

  const onSendMessage = message => {
    if (message === null) return
    socket.message({ chatroomName: currentChatroom.name, message, type: 'message' }, err => {
      if (err) return console.error(err)
    })
  }

  const typingTimeout = () => {
    setTyping(false)
    socket.typing({ chatroomName: currentChatroom.name, userName: currentUser.name, typing: false }, (err, users) => {
      if (err) return console.error(err)
    })
  }

  const onKeyPressInMessageInput = e => {
    if (e.key !== 'Enter') {
      setTyping(true)
      socket.typing({ chatroomName: currentChatroom.name, userName: currentUser.name, typing: true }, (err, users) => {
        if (err) return console.error(err)
      })
      clearTimeout(timeoutForTyping)
      setTimeoutForTyping(setTimeout(typingTimeout, 1500))
    } else {
      clearTimeout(timeoutForTyping)
      typingTimeout()
    }
  }
  const onChangeChatSearchInput = value => {
    console.log('value : ', value)
  }

  const scrollToRef = ref => {
    if (ref) return ref.current.scrollIntoView()
  }
  const massageEndRef = useRef(null)
  const executeScroll = ref => scrollToRef(ref)
  const chatScrollList = useRef(null)

  useEffect(() => {
    socket.getChatrooms((err, entry) => {
      dispatch(allActions.chatroomsAction.setChatrooms(entry))
    })

    socket.registerChatroomStatusHandler(onChangeChatroomStatus)

    chatScrollList.current.addEventListener('scroll', e => {
      const { scrollTop, scrollHeight, clientHeight } = e.target
      if (scrollHeight - (scrollTop + clientHeight) < 10) {
        setHolding(false)
        setIsAlert(false)
      } else {
        setHolding(true)
      }
    })

    return () => {
      socket.logoutHandler()
      setMessages([])
    }
  }, [])

  useEffect(() => {
    if (chatHistory.length === 0) setMessages([])
    else {
      setMessages(messages.concat(chatHistory))
    }
  }, [chatHistory])

  useEffect(() => {
    if (!massageEndRef.current) return false

    if (holding) {
      setIsAlert(true)
    } else {
      executeScroll(massageEndRef)
    }
  }, [messages])

  useEffect(() => {
    const selectedChatroom = chatrooms.find(room => room.id === currentChatroom.id)
    if (selectedChatroom) dispatch(allActions.chatroomAction.setChatroom(selectedChatroom))
  }, [chatrooms])

  return (
    <div className="container">
      <div className="row">
        <Menu />
        <section className="chatrooms">
          <ChatSearchInput onChangeChatSearchInput={onChangeChatSearchInput} />
          {chatrooms &&
            chatrooms.map(chatroom => {
              return (
                <ChatroomListItem
                  key={chatroom.id}
                  chatroom={chatroom}
                  onClickChatroom={onClickChatroom}
                  active={currentChatroom.id === chatroom.id}
                />
              )
            })}
          {/* <ChatroomAdd /> */}
        </section>
        <section className="chat">
          <div className="header-chat">
            <i className="icon fa fa-user-o" aria-hidden="true" />
            <p className="name">
              {currentChatroom.name
                ? `${currentChatroom.name} (${currentChatroom.numMembers})`
                : '채팅방을 선택해주세요'}
            </p>
            <div className="user-list">
              {currentChatroom.users &&
                currentChatroom.users.map(user => {
                  return <UserProfileTooltip {...user} key={user.id} />
                })}
            </div>
            <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true" />
          </div>

          <div className="messages-chat" ref={chatScrollList}>
            {renderMessages}
            <ChatTypingAlert typingUsers={typingUsers} />
            <ChatNewMessageAlert isAlert={isAlert} executeScroll={() => executeScroll(massageEndRef)} />
            <div ref={massageEndRef} />
          </div>

          <ChatMessageInput
            onSendMessage={onSendMessage}
            disabled={!currentChatroom.name}
            onKeyPressInMessageInput={onKeyPressInMessageInput}
            executeScroll={() => executeScroll(massageEndRef)}
          />
        </section>
      </div>
    </div>
  )
}
export default Chat
