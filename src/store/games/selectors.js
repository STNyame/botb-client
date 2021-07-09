// export const selectCurrentGame = (state) => {
//   const newArray = [...state.currentGame].filter(
//     (item) => item.user.name !== state.user.name
//   );
//   console.log("this is newArray", newArray);
//   return newArray;
// };

export const selectAllGames = (state) => state.games.all;

export const selectCurrentGame = (state) => state.games.current;
export const selectMessages = (state) => state.games.messages;
