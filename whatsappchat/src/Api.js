export const authGreenAPI = async (idInstance, apiTokenInstance) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const authUrl = `${proxy}https://green-api.com/auth`;
    const authData = {
      idInstance,
      apiTokenInstance
    };
  
    try {
      const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
      });
  
      if (response.ok) {
        const authToken = await response.json();
        console.log('Авторизация успешна:', authToken);
      } else {
        throw new Error('Ошибка при авторизации');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      throw error;
    }
  };
  