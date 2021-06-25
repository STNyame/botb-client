import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  OverlayTrigger,
  Row,
  Button,
  Spinner,
  Tooltip,
} from "react-bootstrap";

import { fetchAllData } from "../store/data/actions";
import { selectAllData } from "../store/data/selectors";
import { selectUser } from "../store/user/selectors";
import {
  removeUserFromGame,
  getCurrentGame,
  readyForGame,
} from "../store/games/actions";
import { selectCurrentGame } from "../store/games/selectors";

export default function RoomPage() {
  const history = useHistory();
  const queryParam = useParams();
  const dispatch = useDispatch();
  const data = useSelector(selectAllData);
  const user = useSelector(selectUser);
  const currentGame = useSelector(selectCurrentGame);
  const room = queryParam.roomId;

  useEffect(() => {
    dispatch(fetchAllData());

    if (!currentGame) {
      dispatch(getCurrentGame(queryParam.roomId));
    }
  }, [user]);

  const handleRemove = (boolean) => {
    dispatch(removeUserFromGame(user.id, history, boolean));
    console.log(user.id);
  };

  return (
    <div>
      <Container>
        {!currentGame || !data.allTribe ? (
          <Spinner animation="grow" variant="secondary" />
        ) : (
          <Row>
            <Col>
              <Card bg="dark">
                <Card.Header>{currentGame.gameName}</Card.Header>
                {currentGame.users.map((u) => (
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip">
                        {u.ready ? "Ready" : "Waiting for response"}
                      </Tooltip>
                    }
                  >
                    <ListGroup.Item
                      // key={item.id}
                      action
                      // href={`/room/${item.id}`}
                    >
                      <Row>
                        <Col>
                          <Image
                            src={u.imageUrl}
                            style={{ width: "200px" }}
                            roundedCircle
                          />
                        </Col>
                        <Col>{u.name}</Col>

                        {u.id !== user.id && (
                          <Col>
                            <Button
                              variant={u.ready ? "success" : "warning"}
                              disabled
                            >
                              {u.ready ? "READY" : "WAITING"}
                              {!u.ready && (
                                <Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              )}
                            </Button>
                          </Col>
                        )}
                        {u.id === user.id && (
                          <Col>
                            <Form.Group controlId="formBasicPassword">
                              <Form.Control as="select">
                                {data.allTribe.map((item) => (
                                  <option key={item.id}>
                                    {item.tribeName}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                dispatch(
                                  readyForGame(user.id, currentGame.id, history)
                                );
                              }}
                            >
                              {u.ready ? "Change settings" : "Ready?"}
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleRemove(true)}
                            >
                              Leave room
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </ListGroup.Item>
                  </OverlayTrigger>
                ))}
              </Card>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            {currentGame && currentGame.users.length <= 1 && (
              <Button variant="warning" disabled>
                Waiting for other players...
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
