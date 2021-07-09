import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Card, ListGroup, Button } from "react-bootstrap";
import { sendMessage } from "../../store/user/actions";
import { selectMessages } from "../../store/games/selectors";

export default function Chatbox(props) {
  const { game, userName } = props;
  const [message, setMessage] = useState("");
  const chatMessage = useSelector(selectMessages);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage(userName, game.id, message));
    setMessage("");
  };
  return (
    <Card bg="dark">
      <Card.Header>Chat</Card.Header>

      {/* TODO Fetch messag array */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Label style={{ fontSize: "1rem" }}>Say Something:</Form.Label>
          <Form.Control
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Enter message"
          />
        </Form.Group>
        <Button style={{ marginBottom: "20px" }} type="submit">
          submit
        </Button>
      </Form>
      <ListGroup.Item
        action
        style={{ height: "300px", overflowY: "scroll", paddingBottom: "10px" }}
      >
        {chatMessage.map((item) => {
          return (
            <div
              style={{
                borderRadius: "3px",
                textAlign: "left",
                fontSize: "0.8rem",
                boxShadow: "3px 3px 3px gray",
                padding: "3px",
              }}
            >
              <p>
                <strong>
                  <em>{item.user}:</em>
                </strong>
              </p>
              <p>{item.message}</p>
            </div>
          );
        })}
      </ListGroup.Item>

      {/* <div style={{ height: "50px", backgroundColor: "black" }}></div> */}
    </Card>
  );
}
