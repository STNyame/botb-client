import axios from "axios";

export const addGames = (games) => ({
  type: "ADD_GAMES",
  payload: games,
});
export const refreshGameList = () => ({
  type: "REFRESH_GAMES",
});
export const getGames = () => async (dispatch, getState) => {
  const res = await axios.get(`http://localhost:4000/db/games`);
  //   dispatch({ type: "ADD_GAMES", payload: res.data });
  dispatch(addGames(res.data));
};

export const postNewGame =
  (gameName, passcode) => async (dispatch, getState) => {
    const res = await axios.post(`http://localhost:4000/db/games/create`, {
      gameName,
      passcode,
    });
    //   dispatch({ type: "ADD_GAMES", payload: res.data });
    dispatch(getGames());
  };
