import React from 'react'

function ChatroomItem(props) {
  const { chatroom, active, onClickChatroom } = props

  return (
    <div
      className={`chatroom ${active ? 'message-active' : ''}`}
      onClick={() => onClickChatroom(chatroom)}
      key={`chatroom-${chatroom.id}`}
    >
      <div
        className="photo"
        style={{
          backgroundImage: `url(${chatroom.photo})`,
        }}
      >
        <div className="online" />
      </div>
      <div className="desc-contact">
        <p className="name">
          {chatroom.name} ({chatroom.numMembers})
        </p>
        <div className="users-list" style={{ marginLeft: '20px', marginTop: '5px' }}>
          {chatroom.users.map(u => {
            return <img src={u.photo} alt="프로필 사진" style={{ height: '28px' }} key={u.id} />
          })}
        </div>
      </div>
      <div className="timer">3 min</div>
    </div>
  )
}
export default ChatroomItem
