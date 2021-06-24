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
    case "READY_PLAYER":
      // action.paylod = playerObj { id, name, img };

      const new_users_array = [...state.current.users].map((user) => {
        // decide whether this player's score needs to be incremented
        if (user.id === action.payload.id) {
          // and if so, create a new player object,
          return {
            // but first copying over the player object's data
            ...user,
            // and then overriding the score property to be incremented
            ready: action.payload.ready,
          };
        } else {
          // else, just keep them
          return user;
        }
      });
      return {
        ...state,
        current: {
          ...state.current,
          users: new_users_array,
        },
      };

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
      return { ...initialState, current: { users: state.current.users } };
    default: {
      return state;
    }
  }
}
