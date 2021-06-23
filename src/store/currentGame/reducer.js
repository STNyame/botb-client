const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CURRENT_GAME":
      return [...action.payload];
    case "ADD_NEW_PLAYER":
      if (!state.some((e) => e.user.name === action.payload.name)) {
        return [...state, action.payload];
      }
      return state;
    case "REMOVE_GAME":
      return initialState;
    default: {
      return state;
    }
  }
}
