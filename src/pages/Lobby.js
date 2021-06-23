import { io } from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../store/user/selectors";
import { selectGames } from "../store/game/selectors";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Form,
  ListGroup,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { getGames, postNewGame, refreshGameList } from "../store/game/actions";

export default function Lobby() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const game = useSelector(selectGames);
  const [open, setOpen] = useState(false);
  const [gameName, setGameName] = useState("");
  const [passcode, setPasscode] = useState("");

  // useEffect(() => {
  //   const socket = io("http://localhost:4000");
  //   socket.emit("test-event", 10, "hi", user);
  //   console.log(socket);
  // }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewGame(gameName, passcode));
  };

  useEffect(() => {
    if (game.length > 0) {
      dispatch(refreshGameList());
    }
    dispatch(getGames());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            {open && (
              <Card bg="dark">
                <Card.Header>Create new game</Card.Header>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      type="name"
                      placeholder="Enter game name"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Passcode</Form.Label>
                    <Form.Control
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      type="password"
                      placeholder="Passcode"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card>
            )}
            <Button
              aria-controls="collapse-form"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {!open ? "Create new game" : "Go back"}
            </Button>
          </Col>
          <Col>
            {!game.length > 0 ? (
              <Spinner animation="border" />
            ) : (
              <Card bg="dark">
                <Card.Header>Games</Card.Header>

                <ListGroup defaultActiveKey="#link1">
                  {game.map((item) => {
                    return (
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip">click to join game</Tooltip>
                        }
                      >
                        <ListGroup.Item
                          key={item.id}
                          action
                          href={`/room/${item.id}/${item.gameName}`}
                        >
                          {item.gameName}
                        </ListGroup.Item>
                      </OverlayTrigger>
                    );
                  })}
                </ListGroup>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
