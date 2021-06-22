const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CURRENT_GAME":
      return [...action.payload];
    case "ADD_NEW_PLAYER":
      return [...state, action.payload];
    case "REMOVE_GAME":
      return initialState;
    default: {
      return state;
    }
  }
}
