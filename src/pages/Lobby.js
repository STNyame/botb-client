import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from "react-bootstrap";

import "./Lobby.css";

import {
  getAllGames,
  postNewGame,
  joinGame,
  removeUserFromGame,
  readyForGame,
} from "../store/games/actions";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewGame(gameName, passcode, history));
  };

  useEffect(() => {
    dispatch(removeUserFromGame(user.id, history, false));
    if (user.ready) {
      console.log(user.ready);
      dispatch(readyForGame(user.id, null, history));
    }
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
              <Card className="card-style">
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
                          className="list-style"
                          disabled={item.users.length === 4}
                          key={item.id}
                          action
                          // href={`/room/${item.id}/${item.gameName}`}
                          onClick={() =>
                            dispatch(joinGame(user.id, item.id, history))
                          }
                        >
                          {item.gameName}
                          <Col>
                            <Button
                              disabled
                              variant={
                                item.users.length === 4
                                  ? "secondary"
                                  : "warning"
                              }
                              style={{ alignSelf: "flex-end" }}
                            >
                              {item.users.length}/4
                            </Button>
                          </Col>
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
