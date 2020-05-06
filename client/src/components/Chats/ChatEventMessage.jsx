import React from 'react'

function ChatEventMessage({ event, user }) {
  return (
    <>
      <p className="event">{`${user.name} ${event}`}</p>
    </>
  )
}

export default ChatEventMessage
