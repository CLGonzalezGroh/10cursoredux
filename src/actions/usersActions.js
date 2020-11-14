import axios from "axios";
import { GET_ALL, LOADING, ERROR } from "../types/usersTypes";

export const getAllUsers = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    let response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: GET_ALL,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: ["User info unavailable", error.message],
    });
  }
};
