const initialState = {
  messages: [],
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
        if (user.id === action.payload.id) {
          return {
            ...user,
            ready: action.payload.ready,
          };
        } else {
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
    case "REMOVE_ONE_PLAYER":
      // action.paylod = playerObj { id, name, img };

      const userToRemoveArray = [...state.current.users].filter((user) => {
        return user.id !== action.payload.id;
      });
      return {
        ...state,
        current: {
          ...state.current,
          users: userToRemoveArray,
        },
      };

    case "ADD_NEW_PLAYER":
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
      return {
        ...initialState,
        current: { users: state.current.users },
        all: [...state.all],
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    default: {
      return state;
    }
  }
}
