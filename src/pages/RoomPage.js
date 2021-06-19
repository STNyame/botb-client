import { io } from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Card,
  Form,
  ListGroup,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { fetchAllTribes } from "../store/tribe/actions";
import { selectAllTribes } from "../store/tribe/selectors";

export default function RoomPage() {
  const queryParam = useParams();
  const dispatch = useDispatch();
  const tribe = useSelector(selectAllTribes);

  useEffect(() => {
    dispatch(fetchAllTribes());
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
      {!tribe.length > 0 ? (
        <Spinner animation="border" />
      ) : (
        <Card bg="dark">
          <Card.Header>{queryParam.roomId}</Card.Header>

          <ListGroup defaultActiveKey="#link1">
            {/* {game.map((item) => {
              return ( */}
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip">Ready?</Tooltip>}
            >
              <ListGroup.Item
                // key={item.id}
                action
                // href={`/room/${item.id}`}
              >
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Player admin</Form.Label>
                  <Form.Control as="select">
                    {tribe.map((item) => (
                      <option key={item.id}>{item.tribeName}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
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
