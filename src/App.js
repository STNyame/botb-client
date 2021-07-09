// import { io } from "socket.io-client";
// import io from "socket.io-client";
import { socket } from "./service/socket";

import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Lobby from "./pages/Lobby";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserWithStoredToken, saveSocketId } from "./store/user/actions";
import {
  addMessage,
  addNewUserToGame,
  createPlayer,
  getAllGames,
  removeOneUserFromGame,
  startGame,
  userReadyForGame,
} from "./store/games/actions";
import RoomPage from "./pages/RoomPage";
import GamePage from "./pages/GamePage/GamePage";
import { selectUser } from "./store/user/selectors";
import { selectCurrentGame } from "./store/games/selectors";
import { selectPlayer } from "./store/player/selectors";

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const currentGame = useSelector(selectCurrentGame);
  const player = useSelector(selectPlayer);

  useEffect(() => {
    dispatch(getUserWithStoredToken(history));
    // console.log(socket.id);
    // const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      dispatch(saveSocketId(socket.id));
    });
    socket.on("new-player", (player) => {
      dispatch(addNewUserToGame(player));
      dispatch(getAllGames());
    });
    socket.on("remove-player", (player) => {
      dispatch(removeOneUserFromGame(player));
      dispatch(getAllGames());
    });
    socket.on("message", (obj) => {
      if (obj.user !== user.name) {
        dispatch(addMessage(obj));
      }
    });
    socket.on("playerIsReady", (boolean) => {
      dispatch(userReadyForGame(boolean));
    });
    socket.on("start-game", (order) => {
      console.log(player);

      dispatch(createPlayer(user.id, history));
    });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Switch>
          <Route path="/" component={Lobby} exact />
          <Route path="/room/:roomId" component={RoomPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/game/:gameId" component={GamePage} />
        </Switch>
      </header>
    </div>
  );
}
