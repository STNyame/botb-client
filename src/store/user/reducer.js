const initialState = {
  token: localStorage.getItem("token"),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
      };
    case "REMOVE_USER":
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    case "TOKEN_STILL_VALID":
      return { ...state, ...action.payload };
    default: {
      return state;
    }
  }
}
