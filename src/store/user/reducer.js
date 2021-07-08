const initialState = {
  token: localStorage.getItem("token"),
  socketId: null,
  tribe: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
      };
    case "SAVE_SOCKET_ID": {
      return {
        ...state,
        socketId: action.payload,
      };
    }
    case "REMOVE_USER":
      localStorage.removeItem("token");
      return { ...initialState, token: null, socketId: state.socketId };
    case "TOKEN_STILL_VALID":
      return { ...state, ...action.payload };
    case "TRIBE_OF_USER":
      return { ...state, tribe: action.payload };
    default: {
      return state;
    }
  }
}
