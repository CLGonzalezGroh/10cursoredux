import axios from "axios";
import { GET_ALL_TASKS, LOADING, ERROR } from "../types/tasksTypes";

export const getAllTasks = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    let response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tasks = {};
    response.data.map(
      (t) =>
        (tasks[t.userId] = {
          ...tasks[t.userId],
          [t.id]: { ...t },
        })
    );
    dispatch({
      type: GET_ALL_TASKS,
      payload: tasks,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: ["Tasks info unavailable", error.message],
    });
  }
};
