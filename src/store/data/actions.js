import axios from "axios";

export const addData = (data) => ({
  type: "ADD_DATA",
  payload: data,
});

export const fetchAllData = () => async (dispatch, getState) => {
  try {
    const allData = await axios(`http://localhost:4000/db`);
    dispatch(addData(allData.data));
  } catch (e) {
    console.log(e.message);
  }
};
