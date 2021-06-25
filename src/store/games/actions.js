import axios from "axios";
import { addUser } from "../user/actions";

export const addCurrentGame = (currentGame) => ({
  type: "ADD_CURRENT_GAME",
  payload: currentGame,
});
export const addNewUserToGame = (user) => ({
  type: "ADD_NEW_PLAYER",
  payload: user,
});
export const userReadyForGame = (user) => ({
  type: "READY_PLAYER",
  payload: user,
});

export const addAllGames = (games) => ({
  type: "ADD_ALL_GAMES",
  payload: games,
});

export const refreshGameList = () => ({
  type: "REFRESH_GAMES",
});

export const getAllGames = () => async (dispatch, getState) => {
  const res = await axios.get(`http://localhost:4000/game/all`);
  //   dispatch({ type: "ADD_GAMES", payload: res.data });
  dispatch(addAllGames(res.data));
};

export const postNewGame =
  (gameName, passcode, history) => async (dispatch, getState) => {
    const state = getState();
    const res = await axios.post(`http://localhost:4000/game/create`, {
      gameName,
      passcode,
      userId: state.user.id,
    });
    console.log(res.data);
    //   dispatch({ type: "ADD_GAMES", payload: res.data });
    // dispatch(getGames());

    // dispatch(addCurrentGame(res.data));

    // Consider removing game name from url
    dispatch(joinGame(state.user.id, res.data.id, history));
  };

export const removeUserFromGame =
  (userId, history, boolean) => async (dispatch, getState) => {
    try {
      const removeGame = await axios.delete(
        `http://localhost:4000/game/delete/${userId}`
      );
      console.log(removeGame);
      dispatch({ type: "REMOVE_GAME" });

      boolean && history.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };

export const readyForGame =
  (userId, gameId, history) => async (dispatch, getState) => {
    try {
      const socketId = getState().user.socketId;
      const patchUser = await axios.patch(`http://localhost:4000/game/ready`, {
        userId,
        gameId,
        socketId,
      });
      console.log("this is patch ", patchUser);
      const currentGame = dispatch(getCurrentGame(gameId, history));
      dispatch(addUser(patchUser.data));
    } catch (e) {
      console.log(e.message);
    }
  };
export const joinGame =
  (userId, gameId, history) => async (dispatch, getState) => {
    try {
      const socketId = getState().user.socketId;
      const addUser = await axios.post(`http://localhost:4000/game/join`, {
        userId,
        gameId,
        socketId,
      });
      const currentGame = dispatch(getCurrentGame(gameId, history));
    } catch (e) {
      console.log(e.message);
    }
  };

export const getCurrentGame =
  (gameId, history) => async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/game/current/${gameId}`
      );
      dispatch(addCurrentGame({ ...response.data }));
      history.push(`/room/${gameId}`);
    } catch (e) {
      console.log(e.message);
    }
  };
