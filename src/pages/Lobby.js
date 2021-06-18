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

  useEffect(() => {
    !user.id && history.push("/login");
    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {
    if (game.length > 0) {
      dispatch(refreshGameList());
    }
    dispatch(getGames());
    console.log(game);
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
                  overlay={<Tooltip id="tooltip">Join game?</Tooltip>}
                >
                  <ListGroup.Item key={item.id} action href={`#link${item.id}`}>
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
