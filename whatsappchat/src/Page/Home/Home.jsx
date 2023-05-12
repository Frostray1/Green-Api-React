import React, { useState } from 'react'
// import { sendMessage } from 'green-api-service'; // Здесь импортируйте соответствующую функцию для отправки сообщений через GREEN-API
// import { getMessage } from 'green-api-service'; // Здесь импортируйте соответствующую функцию для получения сообщений через GREEN-API
import styles from './Home.module.scss'
import { Col, Row } from 'react-bootstrap'
import { FiUser } from 'react-icons/fi'
import Search from '../../Components/Search/Search'
import Chat from '../../Components/Chat/Chat'
const Home = () => {
	const [message, setMessage] = useState('')
	const [receivedMessage, setReceivedMessage] = useState('')

	const handleSendMessage = async () => {
		// try {
		//   await sendMessage(message); // Отправка сообщения через GREEN-API
		//   // Дополнительная логика при успешной отправке
		//   setMessage('');
		// } catch (error) {
		//   // Обработка ошибок при отправке сообщения
		//   console.error(error);
		// }
	}

	const handleGetMessage = async () => {
		// try {
		//   const response = await getMessage(); // Получение сообщения через GREEN-API
		//   // Обработка полученного сообщения
		//   setReceivedMessage(response.data.message);
		// } catch (error) {
		//   // Обработка ошибок при получении сообщения
		//   console.error(error);
		// }
	}

	return (
		<div className={styles.homeContainer}>
			<Row className={styles.chatContainer}>
				<Col xs={4} className={styles.chats}>
					<div className={styles.chatsHeader}>
						<FiUser className={styles.profileIcon} />
						<h4 className={styles.IdInstance}>IdInstance</h4>
					</div>
					<Search />
				</Col>
				<Col><Chat/></Col>
			</Row>
		</div>
	)
}

export default Home
