import React, { useContext, useEffect, useState } from 'react';
import styles from './ContactsList.module.scss';
import ContactsItem from './ContactsItem';
import { AuthContext } from '../../context/AuthContext';

const ContactsList = () => {
  const [chats, setChats] = useState([]);
  const { idInstance, apiTokenInstance } = useContext(AuthContext);
  const [isContextLoaded, setContextLoaded] = useState(false); // Состояние для отслеживания загрузки контекста

  const proxy = 'https://cors-anywhere.herokuapp.com/';

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `${proxy}https://api.green-api.com/waInstance${idInstance}/getChats/${apiTokenInstance}`
        );
        if (response.ok) {
          const data = await response.json();
          setChats(data); // Обновление состояния с полученным списком чатов
        } else {
          throw new Error('Ошибка при получении чатов');
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    if (idInstance && apiTokenInstance) {
      fetchChats(); // Вызов функции получения чатов только если значения доступны
    }

    setContextLoaded(true); // Установка флага загрузки контекста
  }, [idInstance, apiTokenInstance]);


  // Показывать загрузку или другое состояние, пока контекст не загружен
  if (!isContextLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.ContactsContainer}>
      {chats.map((chat) => (
        <ContactsItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

export default ContactsList;
