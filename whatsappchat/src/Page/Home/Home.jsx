import React, { useContext, useState } from 'react';
import styles from './Home.module.scss';
import { Col, Row } from 'react-bootstrap';
import { FiUser, FiLogOut } from 'react-icons/fi';
import Search from '../../Components/Search/Search';
import Chat from '../../Components/Chat/Chat';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ContactsList from '../../Components/ContactsList/ContactsList';

const Home = () => {
  const navigate = useNavigate();
  const { idInstance, updateIdInstance, updateApiTokenInstance } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    updateIdInstance('');
    updateApiTokenInstance('');
    navigate('/auth');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className={styles.homeContainer}>
      <Row className={styles.chatContainer}>
        <Col xs={4} className={styles.chats}>
          <div className={styles.chatsHeader}>
            <FiUser className={styles.profileIcon} />
            <h4 className={styles.IdInstance}>{idInstance}</h4>
            <button onClick={handleSubmit}>
              <FiLogOut />
            </button>
          </div>
          <Search onSearch={handleSearch} />
          <ContactsList searchTerm={searchTerm} />
        </Col>
        <Col>
          <Chat searchTerm={searchTerm} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
