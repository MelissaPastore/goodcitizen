import axios from "axios";
import GOOGLE_API from "../secrets";

const SET_REP_INFO = "SET_REP_INFO";

export const setRepInfo = (repInfo) => ({
  type: SET_REP_INFO,
  repInfo,
});

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
      console.log(error);
    }
  };
}

const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REP_INFO:
      return action.repInfo;
    default:
      return state;
  }
}
