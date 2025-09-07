import axios from "axios";
import { Dispatch } from "redux";
import { RepInfoActionTypes } from "../types";

const SET_REP_INFO = "SET_REP_INFO";
const SET_REP_INFO_ERR = "SET_REP_INFO_ERR";
const CLEAR_REP_INFO = "CLEAR_REP_INFO";

export const setRepInfo = (repInfo: any): RepInfoActionTypes => ({
  type: SET_REP_INFO,
  repInfo,
});

export const setRepInfoErr = (error: string): RepInfoActionTypes => ({
  type: SET_REP_INFO_ERR,
  error,
});

export const clearRepInfo = (): RepInfoActionTypes => ({ type: CLEAR_REP_INFO });

export function fetchRepInfo(address: string) {
  return async (dispatch: Dispatch<RepInfoActionTypes>) => {
    try {
      const { data } = await axios.get(`/.netlify/functions/cicero-reps-api`, {
        params: {
          address,
        },
      });
      dispatch(setRepInfo(data));
    } catch (error: any) {
      dispatch(setRepInfoErr(error.message));
    }
  };
}

const initialState = { details: null, error: null };

export default function repReducer(state = initialState, action: RepInfoActionTypes) {
  switch (action.type) {
    case SET_REP_INFO:
      return {
        ...state,
        details:
          action.repInfo?.response?.results?.candidates?.[0]?.officials || [],
        error: null,
      };
    case SET_REP_INFO_ERR:
      return { ...state, error: action.error, details: null };
    case CLEAR_REP_INFO:
      return { ...initialState };
    default:
      return state;
  }
}
