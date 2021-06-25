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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserWithStoredToken, saveSocketId } from "./store/user/actions";
import {
  addNewUserToGame,
  removeOneUserFromGame,
  userReadyForGame,
} from "./store/games/actions";
import RoomPage from "./pages/RoomPage";

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserWithStoredToken(history));
    // console.log(socket.id);
    // const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      dispatch(saveSocketId(socket.id));
    });
    socket.on("new-player", (player) => {
      dispatch(addNewUserToGame(player));
    });
    socket.on("remove-player", (player) => {
      dispatch(removeOneUserFromGame(player));
    });
    socket.on("playerIsReady", (boolean) => {
      dispatch(userReadyForGame(boolean));
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
        </Switch>
      </header>
    </div>
  );
}
