import React from 'react'
import ChatMessageInput from './ChatMessageInput'

export default {
  title: 'Chat',
}

export function Input() {
  const currentChatroom = { name: 'test1' }

  const onSendMessage = value => {
    console.log('value : ', value)
  }

  return (
    <section className="chat">
      <ChatMessageInput onSendMessage={onSendMessage} disabled={!currentChatroom.name} />
    </section>
  )
}
