import axios from "axios";

export const addUser = (user) => ({
  type: "ADD_USER",
  payload: user,
});

export const removeUser = (user) => ({
  type: "REMOVE_USER",
  payload: user,
});

// export const signup =
//   (history, name, tribeId) => async (dispatch, getState) => {
//     const player = await axios.post(`http://localhost:4000/signup`, {
//       name: name,
//       tribeId: tribeId,
//     });
//     if (player) {
//       const res = await axios.get(
//         `http://localhost:4000/player/byname/${name}`
//       );
//       const playerId = parseInt(res.data.id);
//       console.log(playerId);
//       dispatch(add({ playerId, name, tribeId }));
//       history.push("/home");
//     }
//   };
export const login = (history, user) => async (dispatch, getState) => {
  try {
    const userToLogin = await axios.post(`http://localhost:4000/login`, {
      email: user.email,
      password: user.password,
    });
    dispatch(addUser(userToLogin.data.user));
    history.push("/lobby");
  } catch (e) {
    console.log(e.message);
  }
};

export const signup = (history, user) => async (dispatch, getState) => {
  try {
    const userToSignup = await axios.post(`http://localhost:4000/signup`, {
      email: user.email,
      name: user.name,
      password: user.password,
    });
    dispatch(addUser(userToSignup.data.user));
    history.push("/");
  } catch (e) {
    console.log(e.message);
  }
};

export const logOut = () => async (dispatch, getState) => {
  dispatch(removeUser(null));
};
