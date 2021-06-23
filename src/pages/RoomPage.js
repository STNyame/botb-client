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
import { fetchAllData } from "../store/data/actions";
import { selectAllData } from "../store/data/selectors";
import { selectUser } from "../store/user/selectors";
import {
  addNewUserToGame,
  addUsersToGame,
  removeUserFromGame,
} from "../store/currentGame/actions";
import { socket } from "../service/socket";
import { selectCurrentGame } from "../store/currentGame/selectors";

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
    if (user.name) {
      socket.emit("join-room", room, user);

      handleRemove(false);
      socket.on("new-player", (obj) => {
        if (obj.name && user.name && obj.name !== user.name) {
          if (!currentGame.filter((e) => e.user.name === obj.name).length > 0) {
            // setPlayers([...players, { ...obj }]);
            dispatch(addNewUserToGame({ user: obj }));
            console.log("111111:", currentGame);
          }
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user.name) {
      if (!currentGame.some((e) => e.user.name === user.name)) {
        dispatch(addUsersToGame(user.id, room));
      }
    }
  }, [user]);

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
  return (
    <div>
      <Container>
        {!data.allTribe ? (
          <Spinner animation="border" />
        ) : (
          <Row>
            <Col>
              <Card bg="dark">
                <Card.Header>{queryParam.roomName}</Card.Header>

                <ListGroup defaultActiveKey="#link1">
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="tooltip">Ready?</Tooltip>}
                  >
                    <ListGroup.Item>
                      <Container>
                        <Row>
                          <Col>
                            <Image
                              src={user.imageUrl}
                              style={{ width: "200px" }}
                              roundedCircle
                            />
                          </Col>
                          <Col>
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>{user.name}</Form.Label>
                              <Form.Control as="select">
                                {data.allTribe.map((item) => (
                                  <option key={item.id}>
                                    {item.tribeName}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                            <Button variant="secondary">Ready?</Button>
                            <Button
                              variant="warning"
                              onClick={() => handleRemove(true)}
                            >
                              Leave room
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </ListGroup.Item>
                  </OverlayTrigger>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
        {!currentGame.length > 0 ? (
          <Spinner animation="grow" variant="secondary" />
        ) : (
          currentGame.map((item) => {
            return (
              <Row>
                <Col>
                  <Card bg="dark">
                    <Card.Header>{queryParam.roomName}</Card.Header>
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip id="tooltip">Ready?</Tooltip>}
                    >
                      <ListGroup.Item
                        // key={item.id}
                        action
                        // href={`/room/${item.id}`}
                      >
                        <Row>
                          <Col>
                            <Image
                              src={item.user.imageUrl}
                              style={{ width: "200px" }}
                              roundedCircle
                            />
                          </Col>
                          <Col>{item.user.name}</Col>
                        </Row>
                      </ListGroup.Item>
                    </OverlayTrigger>
                  </Card>
                </Col>
              </Row>
            );
          })
        )}
      </Container>
    </div>
  );
}
