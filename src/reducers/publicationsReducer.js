import {
  UPDATE_PUBLICATIONS,
  LOADING,
  ERROR,
  UPDATE_COMMENTS,
  COM_LOADING,
  COM_ERROR,
} from "../types/publicationsTypes";

const INITIAL_STATE = {
  publications: [],
  loading: false,
  error: "",
  com_loading: false,
  com_error: "",
};

const publicationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
        loading: false,
        error: "",
      };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_COMMENTS:
      return {
        ...state,
        publications: action.payload,
        com_loading: false,
        com_error: "",
      };
    case COM_LOADING:
      return { ...state, com_loading: true };
    case COM_ERROR:
      return { ...state, com_error: action.payload, com_loading: false };
    default:
      return state;
  }
};

export default publicationsReducer;
