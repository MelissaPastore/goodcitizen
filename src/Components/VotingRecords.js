import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import RecordForm from "./RecordForm";
import { fetchMembers } from "../store/members";

const VotingRecords = ({ match }) => {
  const [currChamber, setChamber] = useState("senate");

  useEffect(() => {
    if (match.params.chamber) {
      setChamber(match.params.chamber);
    }
  }, [match.params.chamber]);

  const handleChange = async (event) => {
    await setChamber(event.target.value);
  };

  return (
    <div>
      <p id="record-header">
        Voting history is only available for members of U.S. Congress.
      </p>
      <form>
        <label id="chamber-label" htmlFor="chamber-select">
          Do you want to search Senate or the House?{" "}
        </label>

        <select id="chamber-select" onChange={handleChange}>
          <option value="senate">Senate</option>
          <option value="house">House</option>
        </select>
      </form>
      <RecordForm chamber={currChamber} name={match.params.name} />
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     members: state.members,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembers: (chamber) => dispatch(fetchMembers(chamber)),
  };
};

export default connect(null, mapDispatchToProps)(VotingRecords);
