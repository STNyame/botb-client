import axios from "axios";
import { DB_URL } from "../../service/db-url";

export const addData = (data) => ({
  type: "ADD_DATA",
  payload: data,
});

export const fetchAllData = () => async (dispatch, getState) => {
  try {
    const allData = await axios(`${DB_URL}/db`);
    dispatch(addData(allData.data));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchCurrentGame = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${DB_URL}/game/${id}`);
    console.log(response);
    // dispatch(addData(allData.data));
  } catch (e) {
    console.log(e.message);
  }
};
