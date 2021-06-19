import axios from "axios";

export const addTribes = (data) => ({
  type: "ADD_TRIBES",
  payload: data,
});

export const fetchAllTribes = () => async (dispatch, getState) => {
  try {
    const allTribes = await axios(`http://localhost:4000/db/tribes`);
    dispatch(addTribes(allTribes.data));
  } catch (e) {
    console.log(e.message);
  }
};
