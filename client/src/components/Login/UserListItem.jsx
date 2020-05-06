import React from 'react'

const UserListItem = props => {
  const { user, onClickUserSelection } = props
  return (
    <div className="user-list-item" onClick={() => onClickUserSelection(user)}>
      <img className="user-list-item-photo" src={user.photo} alt="프로필 이미지" />
      <span type="button" className="enrolled-user">
        {user.lastName} {user.name}
      </span>
    </div>
  )
}

export default UserListItem
