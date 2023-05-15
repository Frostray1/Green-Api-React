import React, { useContext } from 'react';
import styles from './Auth.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';

const Auth = () => {
	const { updateIdInstance, updateApiTokenInstance } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		navigate(routes.home);
	};

	return (
		<div className={styles.authContainer}>
			<h2>Вход</h2>
			<form className={styles.authForm} onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='ID Instance'
					onChange={e => updateIdInstance(e.target.value)}
				/>
				<input
					type='text'
					placeholder='API Token Instance'
					onChange={e => updateApiTokenInstance(e.target.value)}
				/>
				<button type='submit'>Войти</button>
			</form>
		</div>
	);
};

export default Auth;
