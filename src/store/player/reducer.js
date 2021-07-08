const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "player/add":
      return {
        ...state,
        id: action.payload.playerId,
        name: action.payload.name,
        tribeId: action.payload.tribeId,
      };
    case "player/removePlayer":
      return {
        ...state,
        id: action.payload,
        name: action.payload,
        tribeId: action.payload,
      };
    case "ADD_PLAYER":
      return action.payload;
    default: {
      return state;
    }
  }
}
