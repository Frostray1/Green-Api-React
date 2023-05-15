import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [idInstance, setIdInstance] = useState('');
	const [apiTokenInstance, setApiTokenInstance] = useState('');

	useEffect(() => {
		const storedIdInstance = localStorage.getItem('idInstance');
		const storedApiTokenInstance = localStorage.getItem('apiTokenInstance');

		if (storedIdInstance) {
			setIdInstance(storedIdInstance);
		}

		if (storedApiTokenInstance) {
			setApiTokenInstance(storedApiTokenInstance);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('idInstance', idInstance);
		localStorage.setItem('apiTokenInstance', apiTokenInstance);
	}, [idInstance, apiTokenInstance]);

	const updateIdInstance = value => {
		setIdInstance(value);
	};

	const updateApiTokenInstance = value => {
		setApiTokenInstance(value);
	};

	return (
		<AuthContext.Provider
			value={{
				idInstance,
				apiTokenInstance,
				updateIdInstance,
				updateApiTokenInstance
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
