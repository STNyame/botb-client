import { io } from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../store/user/selectors";
import { selectGames } from "../store/game/selectors";
import { useEffect } from "react";
import {
  Card,
  ListGroup,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { getGames, refreshGameList } from "../store/game/actions";

export default function Lobby() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const game = useSelector(selectGames);

  // useEffect(() => {
  //   const socket = io("http://localhost:4000");
  //   socket.emit("test-event", 10, "hi", user);
  //   console.log(socket);
  // }, []);

  useEffect(() => {
    if (game.length > 0) {
      dispatch(refreshGameList());
    }
    dispatch(getGames());
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <div>
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
                  overlay={<Tooltip id="tooltip">click to join game</Tooltip>}
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
    </div>
  );
}
