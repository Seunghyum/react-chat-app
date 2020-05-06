import React, { useState } from 'react'
import ChatroomListItem from './ChatroomListItem'

export default {
  title: 'Chat',
}

export function ChatroomList() {
  const [clickedChatroomItem, setClickedChatroomItem] = useState({})
  const dummyData = [
    {
      id: '1',
      name: '산',
      photo: 'https://img.icons8.com/cotton/64/000000/mountain.png',
      numMembers: 0,
      users: [],
    },
    {
      id: '2',
      name: '바다',
      photo: 'https://img.icons8.com/color/48/000000/sea-waves.png',
      numMembers: 0,
      users: [],
    },
    {
      id: '3',
      name: '들판',
      photo: 'https://img.icons8.com/color/48/000000/field.png',
      numMembers: 0,
      users: [],
    },
    {
      id: '4',
      name: '하늘',
      photo: 'https://img.icons8.com/clouds/100/000000/clouds.png',
      numMembers: 0,
      users: [],
    },
  ]

  const onClickChatroom = chatroom => {
    setClickedChatroomItem(chatroom)
  }

  return (
    <>
      <div className="chatrooms">
        {dummyData.map(data => {
          return <ChatroomListItem chatroom={data} active={false} key={data.id} onClickChatroom={onClickChatroom} />
        })}
      </div>
      <pre>{JSON.stringify(clickedChatroomItem)}</pre>
    </>
  )
}
