import axios from "axios";

const SET_RECORD = "SET_RECORD";
const SET_RECORD_ERR = "SET_RECORD_ERR";
const CLEAR_RECORD = "CLEAR_RECORD";

export const setRecord = (record) => ({
  type: SET_RECORD,
  record,
});

export const clearRecord = () => ({
  type: CLEAR_RECORD,
});

export const setRecordErr = (error) => ({ type: SET_RECORD_ERR, error });

export function fetchRecord(member) {
  return async (dispatch) => {
    try {
      const {
        data,
      } = await axios.get(
        `/.netlify/functions/propublica-voting-records`,
        { 
          params: { 
            memberId: member.id 
          } 
        }
      );
      dispatch(setRecord(data.results[0].votes));
    } catch (error) {
      dispatch(setRecordErr(error.message));
    }
  };
}

const initialState = { details: null, error: null };

export default function votingRecordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECORD:
      return { ...state, details: action.record };
    case SET_RECORD_ERR:
      return { ...state, error: action.error };
    case CLEAR_RECORD:
      return {};
    default:
      return state;
  }
}
