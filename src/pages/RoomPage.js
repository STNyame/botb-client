import { io } from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

export default function RoomPage() {
  const queryParam = useParams();
  const dispatch = useDispatch();
  const data = useSelector(selectAllData);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchAllData());
    const socket = io("http://localhost:4000");
    socket.emit("test-event", 10, "hi");
    console.log(socket);
  }, []);

  // useEffect(() => {
  //   if (game.length > 0) {
  //     dispatch(refreshGameList());
  //   }
  //   dispatch(getGames());
  //   // eslint-disable-next-line
  // }, [dispatch]);
  return (
    <div>
      {!data.allTribe ? (
        <Spinner animation="border" />
      ) : (
        <Card bg="dark">
          <Card.Header>{queryParam.roomId}</Card.Header>

          <ListGroup defaultActiveKey="#link1">
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip">Ready?</Tooltip>}
            >
              <ListGroup.Item>
                <Container>
                  <Row>
                    <Col>
                      <Image src={user.imageUrl} roundedCircle />
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>{user.name}</Form.Label>
                        <Form.Control as="select">
                          {data.allTribe.map((item) => (
                            <option key={item.id}>{item.tribeName}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Button variant="secondary">Ready?</Button>
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>
            </OverlayTrigger>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip">Ready?</Tooltip>}
            >
              <ListGroup.Item
                // key={item.id}
                action
                // href={`/room/${item.id}`}
              >
                Player 1
              </ListGroup.Item>
            </OverlayTrigger>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip">Ready?</Tooltip>}
            >
              <ListGroup.Item
                // key={item.id}
                action
                // href={`/room/${item.id}`}
              >
                Player 2
              </ListGroup.Item>
            </OverlayTrigger>
            {/* );
            })} */}
          </ListGroup>
        </Card>
      )}
    </div>
  );
}
