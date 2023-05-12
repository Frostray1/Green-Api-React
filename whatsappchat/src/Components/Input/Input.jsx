import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './Input.module.scss'
import { BsPaperclip } from 'react-icons/bs'
import { IoSendSharp } from 'react-icons/io5'

const Input = () => {
	const [text, setText] = useState('')

	const handleKey = e => {
		e.code === 'Enter' && handleSend()
	}

	const handleSend = async () => {
		setText('')
	}

	return (
		<Row className={styles.inputWindow}>
			<Col xs={1} className={styles.addFile}>
				{' '}
				<BsPaperclip />
			</Col>
			<Col>
				<input
					className={styles.inputChat}
					type='text'
					placeholder='Write the message'
					onChange={e => setText(e.target.value)}
					onKeyDown={handleKey}
					value={text}
				/>
			</Col>
			<Col xs={1} className={styles.sendButton}>
				<button onClick={handleSend}>
					<IoSendSharp />
				</button>
			</Col>
		</Row>
	)
}

export default Input
