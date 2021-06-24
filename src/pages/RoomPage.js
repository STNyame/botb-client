import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { socket } from "../service/socket";

import { fetchAllData } from "../store/data/actions";
import { selectAllData } from "../store/data/selectors";
import { selectUser } from "../store/user/selectors";
import {
  addNewUserToGame,
  joinGame,
  removeUserFromGame,
  getCurrentGame,
  readyForGame,
} from "../store/games/actions";
import { selectCurrentGame } from "../store/games/selectors";

export default function RoomPage() {
  const history = useHistory();
  const [players, setPlayers] = useState([]);
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

    // if (user.name) {
    //   socket.emit("join-room", room, user);

    //   handleRemove(false);
    //   socket.on("new-player", (obj) => {
    //     if (obj.name && user.name && obj.name !== user.name) {
    //       if (!currentGame.filter((e) => e.user.name === obj.name).length > 0) {
    //         // setPlayers([...players, { ...obj }]);
    //         dispatch(addNewUserToGame({ user: obj }));
    //       }
    //     }
    //   });
    // }
  }, [user]);
  // useEffect(() => {
  //   socket.on("playerIsReady", (userObj, boolean) => {
  //     if (userObj.id !== user.id) {
  //       const player = { ...userObj, ready: boolean };
  //       dispatch(addNewUserToGame(player));
  //     }
  //   });
  // });

  // useEffect(() => {
  //   if (user.name) {
  //     if (!currentGame.users.some((u) => u.id === user.id)) {
  //       dispatch(joinGame(user.id, room));
  //     }
  //   }
  // }, [user]);

  // useEffect(() => {
  //   socket.on("new-player", (obj) => {
  //     console.log(obj);
  //     // if (obj.id && user.id && obj.id !== user.id) {
  //     setTimeout(function () {
  //       if (!currentGame.some((e) => e.user.name === obj.name)) {
  //         dispatch(addNewUserToGame({ user: obj }));
  //         // setPlayers([...players, { ...obj }]);
  //         // console.log(players);
  //       }
  //     }, 2000);
  //     // }
  //   });
  // }, []);

  // useEffect(() => {
  //   if (connected === false) {
  //     socket.emit("all-players", room, user);
  //     socket.on("all-players", (arr) => {
  //       const newArray = arr.filter((item) => item.name !== user.name);
  //       setPlayers(newArray);
  //       setConnected(true);
  //     });
  //   }
  // });
  const handleRemove = (boolean) => {
    dispatch(removeUserFromGame(user.id, history, boolean));
    console.log(user.id);
  };
  console.log(currentGame);
  // socket.on("playerIsReady", (boolean) => {
  //   console.log("this is what i want:", boolean);
  // });
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
      </Container>
    </div>
  );
}
