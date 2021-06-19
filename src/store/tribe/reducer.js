const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TRIBES":
      return [...state, ...action.payload];
    default: {
      return state;
    }
  }
}
