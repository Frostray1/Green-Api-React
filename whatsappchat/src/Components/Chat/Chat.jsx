import React, { useContext, useEffect, useState } from 'react'
import styles from './Chat.module.scss'
import { AiOutlineVideoCamera, AiOutlineUserAdd } from 'react-icons/ai'
import { Col, Row } from 'react-bootstrap'
import { BsThreeDots } from 'react-icons/bs'
import Input from '../Input/Input'
import Message from '../Message/Message'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const Chat = ({ searchTerm }) => {
	const { idInstance, apiTokenInstance } = useContext(AuthContext)
	const [messages, setMessages] = useState([])
	const [inMessage, setInMessage] = useState(null)
	const proxy = 'https://cors-anywhere.herokuapp.com/'

	useEffect(() => {
		setMessages([])
	}, [searchTerm])

	useEffect(() => {
		const fetchChats = async data => {
			try {
				const response = await axios.post(
					`${proxy}https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
					data
				)
				console.log('Ответ сервера:', response.data)
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error)
			}
		}

		if (searchTerm && messages.length > 0) {
			const message = messages[messages.length - 1]
			console.log(messages)
			fetchChats({ chatId: `${searchTerm}@c.us`, message: message });
		}
	}, [messages])

	const fetchNotifications = async () => {
		try {
			const response = await axios.get(
				`${proxy}https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
			)
			if (response.data !== null) {
				console.log('Уведомления:', response.data)
				const newInMessage =
					response.data.body.messageData.textMessageData.textMessage
				setInMessage(newInMessage)
				// setInMessage('приветфыв')

				const deleteNotification = await axios.delete(
					`${proxy}https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${response.data.receiptId}`
				)
			}else{
				setInMessage(null)
			}
		} catch (error) {
			console.error('Ошибка при получении уведомлений:', error)
		}
	}

	useEffect(() => {
		if (searchTerm) {
			const intervalId = setInterval(fetchNotifications, 50000)
			return () => clearInterval(intervalId)
		}
	}, [searchTerm])

	const handleSendMessage = message => {
		setMessages(prevMessages => [...prevMessages, message])
	}

	return (
		<div className={styles.chat}>
			<Row className={styles.headerChat}>
				<Col>
					<h5>{searchTerm && `Новый чат с ${searchTerm}`}</h5>
				</Col>
				<Col className={styles.chatIcons}>
					<AiOutlineVideoCamera />
					<AiOutlineUserAdd />
					<BsThreeDots />
				</Col>
			</Row>
			<Row className={styles.messagesChat}>
				{messages.map((message, index) =>
					inMessage !== null ? (
						<Message
							key={index}
							text={message}
							style={'inMessage'}
						/>
					) : (
						<Message
							key={index}
							text={message}
							style={'outMessage'}
						/>
					)
				)}
			</Row>
			<Row className={styles.inputChat}>
				<Input onSendMessage={handleSendMessage} />
			</Row>
		</div>
	)
}

export default Chat
