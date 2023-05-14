import { useContext } from 'react'

import axios from 'axios'
import { proxy } from './constants';
import { AuthContext } from '../context/AuthContext'

const useChatApi = () => {
	const { idInstance, apiTokenInstance } = useContext(AuthContext)

  const fetchChats = async (data) => {
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

  const fetchNotifications = async () => {
    try {
      const result = await axios.get(
        `${proxy}https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
      )
      return result;
    } catch (error) {
      console.error('Ошибка при получении уведомлений:', error)
    }
  }

  return {
    fetchChats,
    fetchNotifications,
  }
}

export default useChatApi;

