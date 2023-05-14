import React from 'react'

import Message from '../Message/Message'

const Messages = ({ messages }) => {
  return (
    <>
    	{messages?.map(
        (message, index) => (
          <Message
            key={index}
            text={message.text}
            style={message?.type === 'in' ? 'inMessage' : 'outMessage'}
          />
        )
			)}
    </>
  )
}

export default Messages;