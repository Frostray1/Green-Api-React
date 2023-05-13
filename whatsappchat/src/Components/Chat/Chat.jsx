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
	const [messages, setMessages] = useState([])
	const { idInstance, apiTokenInstance } = useContext(AuthContext)
	const proxy = 'https://cors-anywhere.herokuapp.com/'
	const [receivedMessage, setReceivedMessage] = useState(null)
	const [responseMessage, setResponseMessage] = useState(null)
	const [isChatActive, setIsChatActive] = useState(false)

	useEffect(() => {
		const fetchChats = async data => {
			try {
				const response = await axios.post(
					`${proxy}https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
					data
				)
				console.log('Ответ сервера:', response.data)
				// Дальнейшая обработка ответа
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error)
				// Обработка ошибки
			}
		}

		const fetchNotifications = async () => {
			try {
				// const response = await axios.get(`${proxy}https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
					
				console.log('Уведомления:', response.data)
				if (
					response.data.body.typeWebhook ===
						'incomingMessageReceived' &&
					isChatActive
				) {
					setReceivedMessage(
						response.data.body.messageData.textMessageData
							.textMessage
					)
					setResponseMessage(response.data.body)
				}
			} catch (error) {
				console.error('Ошибка при получении уведомлений:', error)
			}
		}

		if (searchTerm && messages.length > 0) {
			const message = messages[messages.length - 1]
			fetchChats({ chatId: `${searchTerm}@c.us`, message: message })
		}

		const interval = setInterval(fetchNotifications, 10000)

		return () => {
			clearInterval(interval)
		}
	}, [searchTerm, messages, idInstance, apiTokenInstance])

	const handleSendMessage = message => {
		setIsChatActive(true)
		setMessages(prevMessages => [...prevMessages, message])
	}

	return (
		<div className={styles.chat}>
			<Row className={styles.headerChat}>
				<Col>
					<h5>{searchTerm}</h5>
				</Col>
				<Col className={styles.chatIcons}>
					<AiOutlineVideoCamera />
					<AiOutlineUserAdd />
					<BsThreeDots />
				</Col>
			</Row>
			<Row className={styles.messagesChat}>
				{messages.map((message, index) => (
					<Message key={index} text={message} />
				))}
				{receivedMessage && (
					<Message
						text={receivedMessage}
						message={responseMessage}
						number={searchTerm}
					/>
				)}
				{receivedMessage &&
					messages.length === 0 && ( // Добавлено условие, чтобы отобразить только полученное сообщение, если нет отправленных сообщений
						<Message
							text={receivedMessage}
							message={responseMessage}
							number={searchTerm}
						/>
					)}
			</Row>
			<Row className={styles.inputChat}>
				<Input onSendMessage={handleSendMessage} />
			</Row>
		</div>
	)
}

export default Chat
