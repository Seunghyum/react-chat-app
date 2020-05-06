import React from 'react'

function UserProfileTooltip(props) {
  const { photo, lastName, name, statusText } = props

  return (
    <span className="tooltip">
      <img src={photo} alt="프로필 사진" style={{ height: '30px' }} />
      <div className="tooltip__content">
        <p>
          풀네임 : {lastName} {name}
        </p>
        <p className="status-message">상태메세지 : {statusText}</p>
      </div>
    </span>
  )
}
export default UserProfileTooltip
