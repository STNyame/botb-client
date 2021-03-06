import axios from "axios";
import { addUser } from "../user/actions";
import { DB_URL } from "../../service/db-url";
import { addPlayer } from "../player/actions";

export const addMessage = (obj) => ({
  type: "ADD_MESSAGE",
  payload: obj,
});

export const addCurrentGame = (currentGame) => ({
  type: "ADD_CURRENT_GAME",
  payload: currentGame,
});
export const addNewUserToGame = (user) => ({
  type: "ADD_NEW_PLAYER",
  payload: user,
});
export const removeOneUserFromGame = (user) => ({
  type: "REMOVE_ONE_PLAYER",
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
  const res = await axios.get(`${DB_URL}/game/all`);
  //   dispatch({ type: "ADD_GAMES", payload: res.data });
  dispatch(addAllGames(res.data));
};

export const postNewGame =
  (gameName, passcode, history) => async (dispatch, getState) => {
    const state = getState();
    const res = await axios.post(`${DB_URL}/game/create`, {
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
      const removeGame = await axios.delete(`${DB_URL}/game/delete/${userId}`);
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
      const patchUser = await axios.patch(`${DB_URL}/game/ready`, {
        userId,
        gameId,
        socketId,
      });
      console.log("this is patch ", patchUser);
      dispatch(getCurrentGame(gameId, history));
      dispatch(addUser(patchUser.data));
    } catch (e) {
      console.log(e.message);
    }
  };
export const joinGame =
  (userId, gameId, history) => async (dispatch, getState) => {
    try {
      const socketId = getState().user.socketId;
      await axios.post(`${DB_URL}/game/join`, {
        userId,
        gameId,
        socketId,
      });
      dispatch(getCurrentGame(gameId, history));
    } catch (e) {
      console.log(e.message);
    }
  };

export const getCurrentGame =
  (gameId, history) => async (dispatch, getState) => {
    try {
      const response = await axios.get(`${DB_URL}/game/current/${gameId}`);
      dispatch(addCurrentGame({ ...response.data }));
      history.push(`/room/${gameId}`);
    } catch (e) {
      console.log(e.message);
    }
  };
export const startGame = (gameId) => async (dispatch, getState) => {
  axios.post(`${DB_URL}/player/start`, {
    gameId,
  });
};

export const createPlayer = (userId, history) => async (dispatch, getState) => {
  const state = getState();
  const gameId = state.games.current.id;
  const tribeId = state.user.tribe;
  try {
    // if (state.player === {}) {
    const createAndGetPlayer = await axios.post(`${DB_URL}/player/create`, {
      userId,
      gameId,
      tribeId,
    });
    const getPlayer = await axios.get(
      `${DB_URL}/player/resourceOfPlayer/${createAndGetPlayer.data.id}`
    );
    dispatch(addPlayer(getPlayer.data));
    history.push(`/game/${gameId}`);
    // }
  } catch (e) {
    console.log(e.message);
  }
};
