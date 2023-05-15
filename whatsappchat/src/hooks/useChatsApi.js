import { useContext } from 'react';
import axios from 'axios';
import { API_URL, proxy } from './constants';
import { AuthContext } from '../context/AuthContext';

const useChatApi = () => {
	const { idInstance, apiTokenInstance } = useContext(AuthContext);

	const fetchChats = async data => {
		try {
			const response = await axios.post(
				`${API_URL}waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
				data
			);
		} catch (error) {
			console.error('Ошибка при выполнении запроса:', error);
		}
	};

	const fetchNotifications = async () => {
		try {
			const result = await axios.get(
				`${API_URL}waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
			);
			if (result.data !== null) {
				const deleteNotification = await axios.delete(
					`${API_URL}waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${result.data.receiptId}`
				);
			}

			return result;
		} catch (error) {
			console.error('Ошибка при получении уведомлений:', error);
		}
	};

	return {
		fetchChats,
		fetchNotifications
	};
};

export default useChatApi;
