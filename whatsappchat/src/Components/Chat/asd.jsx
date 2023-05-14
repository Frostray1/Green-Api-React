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
	const proxy = 'https://cors-anywhere.herokuapp.com/'
	const [notification, setNotification] = useState(null)
	const [inMessage, setInMessage] = useState(null)

	useEffect(() => {
		setMessages([]) // Очистка массива сообщений при изменении searchTerm
	}, [searchTerm])

	useEffect(() => {
		// setMessages([]);
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
			// fetchChats({ chatId: `${searchTerm}@c.us`, message: message })
		}
	}, [messages])

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await axios.get(
					`${proxy}https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
				)
				if (response.data !== null) {
					console.log('Уведомления:', response.data)
					setNotification(
						response.data.body.senderData.chatId.split('@')[0]
					)
					setInMessage(
						response.data.body.messageData.textMessageData
							.textMessage
					)
					const deleteNotification = await axios.delete(
						`${proxy}https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${response.data.receiptId}`
					)
				}
			} catch (error) {
				console.error('Ошибка при получении уведомлений:', error)
			}
		}

		
		if (searchTerm) {
			// const intervalId = setInterval(fetchNotifications, 15000);
			// fetchNotifications()
			messages.push(inMessage)
			// return () => clearInterval(intervalId);

		}
	}, [searchTerm])

	console.log(notification)
	console.log(inMessage)

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
			{messages.map((message, index) => (
				notification === searchTerm ? <Message text={inMessage} style={'inMessage'} /> : <Message key={index} text={message} style={'outMessage'} />
				))}
				{/* {messages.map((message, index) => (
					<Message key={index} text={message} style={'outMessage'} />
				))}
				{notification === searchTerm && (
					<Message text={inMessage} style={'inMessage'} />
				)} */}
			</Row>
			<Row className={styles.inputChat}>
				<Input onSendMessage={handleSendMessage} />
			</Row>
		</div>
	)
}

export default Chat
