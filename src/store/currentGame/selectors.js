export const selectCurrentGame = (state) => {
  const newArray = [...state.currentGame].filter(
    (item) => item.user.name !== state.user.name
  );
  console.log("this is newArray", newArray);
  return newArray;
};
