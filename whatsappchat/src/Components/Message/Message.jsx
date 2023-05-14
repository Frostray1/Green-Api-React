import React from 'react'
import styles from './Message.module.scss'

const Message = ({text, style}) => {
	return (
		<div className={style === 'inMessage'? styles.inMessage: styles.outMessage}>
			<div className={styles.textMessage}>
				<p>{text}</p>
			</div>
		</div>
	)
}

export default Message
