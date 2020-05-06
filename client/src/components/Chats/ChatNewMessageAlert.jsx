import React from 'react'

function ChatAlert({ isAlert, executeScroll }) {
  return (
    <div onClick={() => executeScroll()} className={`chat-alert ${isAlert ? '' : 'hiden'}`}>
      {' '}
      새로운 메세지가 도착했습니다
    </div>
  )
}
export default ChatAlert
