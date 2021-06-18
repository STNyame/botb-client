const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_GAMES":
      return [...state, ...action.payload];
    case "REFRESH_GAMES":
      return initialState;
    default: {
      return state;
    }
  }
}
