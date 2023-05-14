import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Message.module.scss'

const Message = ({text, style}) => {
    console.log(style)
	return (
		<div>
			<div className={style === 'inMessage'? styles.inMessage: styles.outMessage}>
				<div className={styles.textMessage}>
					<p>{text}</p>
				</div>
			</div>
		</div>
	)
}

export default Message
