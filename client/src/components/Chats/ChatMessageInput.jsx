import React, { useState } from 'react'

function ChatMessageInput(props) {
  const { disabled } = props
  const [inputMessage, setInputMessage] = useState('')

  const onSendMessage = () => {
    if (disabled) return
    if (inputMessage === null) return
    props.onSendMessage(inputMessage)
    setInputMessage('')
  }

  const onChangeInput = e => {
    if (disabled) return
    setInputMessage(e.target.value)
  }

  const onKeyPressInMessageInput = e => {
    if (disabled) return
    props.onKeyPressInMessageInput(e)
    if (e.key === 'Enter') return onSendMessage()
  }

  return (
    <div className={`footer-chat ${disabled ? 'disabled' : ''}`}>
      <i className="icon fa fa-smile-o clickable" style={{ fontSize: '25pt' }} aria-hidden="true" />
      <input
        disabled={disabled}
        type="text"
        className="write-message"
        placeholder={disabled ? '채팅창을 먼저 선택해주세요' : 'Type here!'}
        onChange={onChangeInput}
        value={inputMessage}
        onKeyPress={onKeyPressInMessageInput}
      />
      <i className="icon send fa fa-paper-plane-o clickable" aria-hidden="true" onClick={() => onSendMessage()} />
    </div>
  )
}

export default ChatMessageInput
