export const selectCurrentGame = (state) => {
  const newArray = [...state.currentGame].filter(
    (item) => item.user.name !== state.user.name
  );
  return newArray;
};
