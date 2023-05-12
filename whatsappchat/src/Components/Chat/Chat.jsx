import React from "react";
import styles from "./Chat.module.scss";
import { AiOutlineVideoCamera, AiOutlineUserAdd } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import Input from "../Input/Input";

const Chat = () => {

  return (
    <div className={styles.chat}>
      <Row className={styles.headerChat}>
        <Col>
          <h5>username</h5>
        </Col>
        <Col className={styles.chatIcons}>
          <AiOutlineVideoCamera />
          <AiOutlineUserAdd />
          <BsThreeDots />
        </Col>
      </Row>
      <Row className={styles.messagesChat}>
        {/* <Messages /> */}
      </Row>
      <Row className={styles.inputChat}>
        <Input />
      </Row>

    </div>
  );
};

export default Chat;
