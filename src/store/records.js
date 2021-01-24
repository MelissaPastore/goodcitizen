import axios from "axios"
import {PROPUBLICA_API} from "../secrets"

const SET_RECORD = "SET_RECORD";

export const setRecord = (record) => ({
  type: SET_RECORD,
  record
})

export function fetchRecord (member) {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`https://api.propublica.org/congress/v1/members/${member.id}/votes.json`, {headers: {"X-API-KEY": PROPUBLICA_API}}
      )
      dispatch (setRecord(data.results[0].votes));
    }
catch(err){
  console.log("There was a problem finding the record for that member of Congress", err)
}
  }
}

const initialState = {};

export default function votingRecordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECORD:
      return action.record;
    default:
      return state;
  }
}
