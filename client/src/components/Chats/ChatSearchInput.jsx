import React, { useState } from 'react'

function ChatSearchInput(props) {
  const [inputValue, setInputValue] = useState('')
  const { onChangeChatSearchInput } = props

  const onChangeInputValue = e => {
    setInputValue(e.target.value)
  }

  return (
    <div className="chatroom search">
      <div className="searchbar">
        <i className="fa fa-search" aria-hidden="true" />
        <input
          type="text"
          value={inputValue}
          placeholder="Search..."
          onChange={e => onChangeInputValue(e)}
          onKeyPress={e => (e.key === 'Enter' ? onChangeChatSearchInput(inputValue) : null)}
        />
      </div>
    </div>
  )
}

export default ChatSearchInput
