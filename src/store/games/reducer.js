const initialState = {
  current: null,
  all: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ALL_GAMES": {
      return { ...state, all: action.payload };
    }
    case "ADD_CURRENT_GAME":
      return { ...state, current: action.payload };
    case "ADD_NEW_PLAYER":
      // action.paylod = playerObj { id, name, img };

      const isInGame = state.current.users.find(
        (u) => u.id === action.payload.id
      );

      if (isInGame) {
        return state;
      } else {
        return {
          ...state,
          current: {
            ...state.current,
            users: [...state.current.users, action.payload],
          },
        };
      }
    case "REMOVE_GAME":
      return initialState;
    default: {
      return state;
    }
  }
}
