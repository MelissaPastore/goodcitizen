import axios from "axios";
const GOOGLE_API = process.env.REACT_APP_GOOGLE_API; 

const SET_REP_INFO = "SET_REP_INFO";
const SET_REP_INFO_ERR = "SET_REP_INFO_ERR";
const CLEAR_REP_INFO = "CLEAR_REP_INFO";

export const setRepInfo = (repInfo) => ({
  type: SET_REP_INFO,
  repInfo,
});

export const setRepInfoErr = (error) => ({
  type: SET_REP_INFO_ERR,
  error,
});

export const clearRepInfo = () => ({ type: CLEAR_REP_INFO });

export function fetchRepInfo(address) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/civicinfo/v2/representatives`,
        {
          params: {
            address,
            key: GOOGLE_API,
          },
        }
      );

      dispatch(setRepInfo(data));
    } catch (error) {
      dispatch(setRepInfoErr(error.message));
    }
  };
}

const initialState = { details: null, error: null };

export default function repReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REP_INFO:
      return { ...state, details: action.repInfo };
    case SET_REP_INFO_ERR:
      return { ...state, error: action.error };
    case CLEAR_REP_INFO:
      return {};
    default:
      return state;
  }
}
