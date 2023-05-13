import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Message.module.scss'

const Message = ({text,message,number}) => {
    console.log(message.senderData.chatId.split('@')[0])
    console.log(number)
    const isResponseMessage = message && message.chatId === number;
	return (
		<div>
			<div className={isResponseMessage ? styles.outMessage : styles.inMessage}>
				<div className={styles.textMessage}>
					<p>{text.text}</p>
				</div>
			</div>
		</div>
	)
}

export default Message
