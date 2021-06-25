import axios from "axios";
import { selectToken } from "./selectors";

export const addUser = (user) => ({
  type: "ADD_USER",
  payload: user,
});

export const saveSocketId = (id) => ({
  type: "SAVE_SOCKET_ID",
  payload: id,
});

export const removeUser = (user) => ({
  type: "REMOVE_USER",
  payload: user,
});

const tokenStillValid = (userWithoutToken) => ({
  type: "TOKEN_STILL_VALID",
  payload: userWithoutToken,
});

export const getUserWithStoredToken = (history) => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) {
      history.push("login");
      return;
    }

    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`http://localhost:4000/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      console.log(response.data);
      dispatch(tokenStillValid(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut(history));
    }
  };
};
export const login = (history, user) => async (dispatch, getState) => {
  try {
    const userToLogin = await axios.post(`http://localhost:4000/login`, {
      email: user.email,
      password: user.password,
    });
    dispatch(addUser(userToLogin.data.user));
    history.push("/");
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
      imageUrl: user.imageUrl,
    });
    dispatch(addUser(userToSignup.data.user));
    history.push("/");
  } catch (e) {
    console.log(e.message);
  }
};

export const logOut = (history) => async (dispatch, getState) => {
  history.push("/login");
  dispatch(removeUser(null));
};
