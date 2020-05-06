import React from 'react'

function ChatTypingAlert(props) {
  const { typingUsers } = props
  return (
    <p className="chat-typing-alert">
      {typingUsers.map((t, i) => {
        return (
          <React.Fragment key={t}>
            <span>{t}</span>
            <span>{i !== typingUsers.length - 1 && ', '}</span>
          </React.Fragment>
        )
      })}
      <span>{typingUsers.length > 0 && ' now typing'}</span>
    </p>
  )
}
export default ChatTypingAlert
