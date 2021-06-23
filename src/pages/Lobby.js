import { io } from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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

import { getAllGames, postNewGame, joinGame } from "../store/games/actions";
import { selectAllGames } from "../store/games/selectors";
import { selectUser } from "../store/user/selectors";

export default function Lobby() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const game = useSelector(selectAllGames);
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
    dispatch(postNewGame(gameName, passcode, history));
  };

  useEffect(() => {
    dispatch(getAllGames());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div>
      <Container>
        <Col>
          {!game.length > 0 ? (
            <Spinner animation="border" />
          ) : (
            !open && (
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
                          // href={`/room/${item.id}/${item.gameName}`}
                          onClick={() =>
                            dispatch(joinGame(user.id, item.id, history))
                          }
                        >
                          {item.gameName}
                        </ListGroup.Item>
                      </OverlayTrigger>
                    );
                  })}
                </ListGroup>
              </Card>
            )
          )}
        </Col>
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

                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card>
          )}
          <Button
            aria-controls="collapse-form"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            variant={!open ? "secondary" : "danger"}
          >
            {!open ? "Create new game" : "Go back"}
          </Button>
        </Col>
      </Container>
    </div>
  );
}
