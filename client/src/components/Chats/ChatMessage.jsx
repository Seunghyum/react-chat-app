import React from 'react'
import dayjs from '../../modules/dayjs'

function ChatMessage({ user, isTextOnly, isResponse, isLast, message, createdAt }) {
  const { photo } = user
  const renderPhoto = () => {
    if (isTextOnly || isResponse) return null
    return (
      <div
        className="photo"
        style={{
          backgroundImage: `url(${photo})`,
        }}
      >
        <div className="online" />
      </div>
    )
  }

  const renderTime = () => {
    if (isTextOnly || isLast) {
      return <p className={`time ${isResponse ? 'response-time' : ''}`}> {dayjs(createdAt).fromNow()} </p>
    }
    return null
  }

  return (
    <>
      <div className={`message ${isTextOnly ? 'text-only' : ''}`}>
        {renderPhoto()}
        <div className={isResponse ? 'response' : ''}>
          <p className="text"> {message}</p>
        </div>
      </div>
      {renderTime()}
    </>
  )
}

export default ChatMessage
