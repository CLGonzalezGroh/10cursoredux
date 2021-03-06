import axios from "axios";
import {
  UPDATE_PUBLICATIONS,
  LOADING,
  ERROR,
  UPDATE_COMMENTS,
  COM_LOADING,
  COM_ERROR,
} from "../types/publicationsTypes";
import { GET_ALL } from "../types/usersTypes";

export const getByUserPublications = (key) => async (dispatch, getState) => {
  dispatch({
    type: LOADING,
  });

  const { users } = getState().usersReducer;
  const { publications } = getState().publicationsReducer;
  const user_id = users[key].id;

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${user_id}`
    );

    const publicationsWidthEmptyComment = response.data.map((post) => ({
      ...post,
      comments: [],
      open: false,
    }));

    const updatedPublications = [
      ...publications,
      publicationsWidthEmptyComment,
    ];

    dispatch({
      type: UPDATE_PUBLICATIONS,
      payload: updatedPublications,
    });

    const publications_key = updatedPublications.length - 1;
    const updatedUsers = [...users];
    updatedUsers[key] = {
      ...users[key],
      publications_key,
    };

    dispatch({
      type: GET_ALL,
      payload: updatedUsers,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: ["Publication info unavailable", error.message],
    });
  }
};

export const openClose = (pub_key, com_key) => (dispatch, getState) => {
  const { publications } = getState().publicationsReducer;
  const selectedPublication = publications[pub_key][com_key];

  const updatedPublication = {
    ...selectedPublication,
    open: !selectedPublication.open,
  };

  const updatedPublications = [...publications];
  updatedPublications[pub_key] = [...publications[pub_key]];
  updatedPublications[pub_key][com_key] = updatedPublication;

  dispatch({
    type: UPDATE_PUBLICATIONS,
    payload: updatedPublications,
  });
};

export const getComments = (pub_key, com_key) => async (dispatch, getState) => {
  dispatch({
    type: COM_LOADING,
  });

  const { publications } = getState().publicationsReducer;
  const selectedPublication = publications[pub_key][com_key];

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${selectedPublication.id}`
    );

    const updatedPublication = {
      ...selectedPublication,
      comments: response.data,
    };

    const updatedPublications = [...publications];
    updatedPublications[pub_key] = [...publications[pub_key]];
    updatedPublications[pub_key][com_key] = updatedPublication;

    dispatch({
      type: UPDATE_COMMENTS,
      payload: updatedPublications,
    });
  } catch (error) {
    dispatch({
      type: COM_ERROR,
      payload: ["Comments info unavailable", error.message],
    });
  }
};
