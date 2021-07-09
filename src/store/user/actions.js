import axios from "axios";
import { DB_URL } from "../../service/db-url";
import { addMessage } from "../games/actions";
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

export const addTribe = (tribeState) => ({
  type: "TRIBE_OF_USER",
  payload: tribeState,
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
      const response = await axios.get(`${DB_URL}/me`, {
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
    const userToLogin = await axios.post(`${DB_URL}/login`, {
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
    const userToSignup = await axios.post(`${DB_URL}/signup`, {
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

export const sendMessage =
  (user, gameId, message) => async (dispatch, getState) => {
    const sendMessage = await axios.post(`${DB_URL}/game/message`, {
      user,
      gameId,
      message,
    });
    console.log("action", sendMessage.data);
  };
