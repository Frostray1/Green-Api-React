import React from 'react'
import styles from './ContactsItem.module.scss'
import { RiUserSmileLine } from 'react-icons/ri'


const ContactsItem = (props) => {
  // console.log(props.chat.id)
  const tel = props.chat.id.split('@')
  return (
    <div className={styles.contactsItem}>
      <RiUserSmileLine/>
      <h5>{tel[0]}</h5>
    </div>
  )
}

export default ContactsItem