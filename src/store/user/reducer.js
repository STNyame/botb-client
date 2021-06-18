const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "REMOVE_USER":
      return initialState;

    default: {
      return state;
    }
  }
}
