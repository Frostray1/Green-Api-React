import React, { useEffect, useState, useCallback } from 'react';
import styles from './Chat.module.scss';
import { AiOutlineVideoCamera, AiOutlineUserAdd } from 'react-icons/ai';
import { Col, Row } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import Input from '../Input/Input';
import useChatsApi from '../../hooks/useChatsApi';
import Messages from './Messages';

const Chat = ({ searchTerm }) => {
	const [messages, setMessages] = useState([]);
	const [telNumber, setTelNumber] = useState(null);

	const { fetchChats, fetchNotifications } = useChatsApi();

	useEffect(() => {
		setMessages([]);
		setTelNumber(searchTerm);
	}, [searchTerm]);

	useEffect(() => {
		if (searchTerm && messages.length > 0) {
			if (telNumber === searchTerm) {
				if (messages[messages.length - 1].type === 'out') {
					const message = messages[messages.length - 1];
					fetchChats({
						chatId: `${searchTerm}@c.us`,
						message: message.text
					});
				}
			}
		}
	}, [fetchChats, messages, searchTerm]);

	const updateMessages = useCallback(() => {
		fetchNotifications().then(result => {
			if (
				result.data !== null &&
				result.data.body.senderData.chatId.split('@')[0] === searchTerm
			) {
				const newInMessage =
					result.data.body.messageData.textMessageData.textMessage;
				if (
					newInMessage &&
					!messages.some(msg => msg.text === newInMessage)
				) {
					setMessages(prev => [
						...prev,
						{ text: newInMessage, type: 'in' }
					]);
				}
			}
		});
	}, [fetchNotifications, messages]);

	useEffect(() => {
		if (searchTerm) {
			const intervalId = setInterval(updateMessages, 15000);
			return () => clearInterval(intervalId);
		}
	}, [fetchNotifications, searchTerm, updateMessages]);

	const handleSendMessage = message => {
		setMessages(prevMessages => [
			...prevMessages,
			{ text: message, type: 'out' }
		]);
	};

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
				<Messages messages={messages} />
			</Row>
			<Row className={styles.inputChat}>
				<Input onSendMessage={handleSendMessage} />
			</Row>
		</div>
	);
};

export default Chat;
