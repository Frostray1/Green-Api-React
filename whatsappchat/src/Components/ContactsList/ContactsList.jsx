import React, { useContext, useEffect, useState } from 'react'
import styles from './ContactsList.module.scss'
import ContactsItem from './ContactsItem'
import { AuthContext } from '../../context/AuthContext'

const ContactsList = ({ searchTerm }) => {
	const [chats, setChats] = useState([])
	const { idInstance, apiTokenInstance } = useContext(AuthContext)
	const [isSearchTermLoaded, setSearchTermLoaded] = useState(false)

	return (
		<div className={styles.ContactsContainer}>
			{searchTerm && <ContactsItem searchTerm={searchTerm} />}
		</div>
	)
}

export default ContactsList
