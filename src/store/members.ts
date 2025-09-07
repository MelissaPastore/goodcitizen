import axios from "axios";
import { Dispatch } from "redux";
import { Member, MembersActionTypes } from "../types";

const SET_MEMBERS = "SET_MEMBERS";

export const setMembers = (members: Member[]): MembersActionTypes => ({
  type: SET_MEMBERS,
  members,
});

export function fetchMembers(chamber: string) {
  return async (dispatch: Dispatch<MembersActionTypes>) => {
    try {
      const {
        data,
      } = await axios.get(
        `/.netlify/functions/propublica-members`,
        { 
          params: { 
            chamber 
          } 
        }
      );
      dispatch(setMembers(data.results[0].members));
    } catch (err) {
      console.log("There was a problem finding the members", err);
    }
  };
}

const initialState: Member[] = [];

export default function votingRecordReducer(state = initialState, action: MembersActionTypes): Member[] {
  switch (action.type) {
    case SET_MEMBERS:
      return action.members;
    default:
      return state;
  }
}
