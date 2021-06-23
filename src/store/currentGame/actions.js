import axios from "axios";

export const addCurrentGame = (currentGame) => ({
  type: "ADD_CURRENT_GAME",
  payload: currentGame,
});
export const addNewUserToGame = (user) => ({
  type: "ADD_NEW_PLAYER",
  payload: user,
});

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
export const addUsersToGame =
  (userId, gameId) => async (dispatch, getState) => {
    const state = getState();
    try {
      const addUser = await axios.post(`http://localhost:4000/game/create`, {
        userId,
        gameId,
      });
      const getUser = await axios.get(`http://localhost:4000/game/${gameId}`);
      console.log("state currentgame:", state.currentGame);
      if (
        !state.currentGame.filter((e) => e.user.name === getUser.data.name)
          .length > 0
      ) {
        dispatch(addCurrentGame(getUser.data));
      }
    } catch (e) {
      console.log(e.message);
    }
  };
