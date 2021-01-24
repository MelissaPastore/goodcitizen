import axios from "axios"
import {PROPUBLICA_API} from "../secrets"

const SET_MEMBERS = "SET_MEMBERS";

export const setMembers = (members) => ({
  type: SET_MEMBERS,
  members,
})

export function fetchMembers (chamber) {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`https://api.propublica.org/congress/v1/116/${chamber}/members.json`, {headers: {"X-API-KEY": PROPUBLICA_API}}
      )
      dispatch (setMembers(data.results[0].members));
    }
catch(err){
  console.log("There was a problem finding the members", err)
}
  }
}

const initialState = [];

export default function votingRecordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MEMBERS:
      return action.members;
    default:
      return state;
  }
}
