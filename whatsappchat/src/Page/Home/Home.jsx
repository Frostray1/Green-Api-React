import React, { useContext } from 'react'
import styles from './Home.module.scss'
import { Col, Row } from 'react-bootstrap'
import { FiUser } from 'react-icons/fi'
import Search from '../../Components/Search/Search'
import Chat from '../../Components/Chat/Chat'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
	const navigate = useNavigate()
	const {
		idInstance,

		updateIdInstance,
		updateApiTokenInstance
	} = useContext(AuthContext)
	const handleSubmit = () => {
		updateIdInstance('')
		updateApiTokenInstance('')
		navigate('/auth')
	}

	return (
		<div className={styles.homeContainer}>
			<Row className={styles.chatContainer}>
				<Col xs={4} className={styles.chats}>
					<div className={styles.chatsHeader}>
						<FiUser className={styles.profileIcon} />
						<h4 className={styles.IdInstance}>{idInstance}</h4>
						<button onClick={() => handleSubmit()}>logout</button>
					</div>
					<Search />
				</Col>
				<Col>
					<Chat />
				</Col>
			</Row>
		</div>
	)
}

export default Home
