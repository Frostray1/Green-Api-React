import React, { useState } from 'react';
import styles from './Auth.module.scss';

const Auth = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ваша логика обработки входа и сохранения данных GREEN-API

    // Перенаправление на другую страницу после успешного входа
    // history.push('/chat');
  };

  return (
    <div className={styles.authContainer}>
      <h2>Вход</h2>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID Instance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
        />
        <input
          type="text"
          placeholder="API Token Instance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Auth;
