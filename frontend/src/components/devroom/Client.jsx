import React from 'react'
import Avatar from 'react-avatar'

const Client = ({ username }) => {
    return (
        <div className='client flex flex-col items-center font-bold '>
            <Avatar name={username} size={50} round="15px" />
            <span className='userName w-16 truncate'>{username}</span>
        </div>
    )
}

export default Client
