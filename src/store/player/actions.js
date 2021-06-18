import axios from "axios";

export const add = (player) => ({
  type: "player/add",
  payload: player,
});
export const removePlayer = (player) => ({
  type: "player/removePlayer",
  payload: player,
});

export const signIn =
  (history, name, tribeId) => async (dispatch, getState) => {
    const player = await axios.post(`http://localhost:4000/player`, {
      name: name,
      tribeId: tribeId,
    });
    if (player) {
      const res = await axios.get(
        `http://localhost:4000/player/byname/${name}`
      );
      const playerId = parseInt(res.data.id);
      console.log(playerId);
      dispatch(add({ playerId, name, tribeId }));
      history.push("/home");
    }
  };
export const login = (history, user) => async (dispatch, getState) => {
  const userToLogin = await axios.post(`http://localhost:4000/login`, {
    email: user.email,
    password: user.password,
  });
  if (user) {
    console.log(userToLogin.data.user);
  }
  // if (user) {
  //   const res = await axios.get(
  //     `http://localhost:4000/player/byname/${name}`
  //   );
  //   const playerId = parseInt(res.data.id);
  //   console.log(playerId);
  //   dispatch(add({ playerId, name, tribeId }));
  //   history.push("/home");
  // }
};

export const signOut = (id) => async (dispatch, getState) => {
  dispatch(removePlayer(null));
  await axios.post(`http://localhost:4000/player/delete/${id}`);
  console.log("working?");
  //   history.push("/");
};
