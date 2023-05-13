import React from 'react'
import styles from './ContactsItem.module.scss'
import { RiUserSmileLine } from 'react-icons/ri'

const ContactsItem = ({ searchTerm }) => { // Добавлены фигурные скобки для деструктуризации пропсов
  const handleClick = () => {
    console.log(searchTerm)
  }

  return (
    <div className={styles.contactsItem} onClick={handleClick}>
      <RiUserSmileLine/>
      <h5>{searchTerm}</h5>
    </div>
  )
}

export default ContactsItem
