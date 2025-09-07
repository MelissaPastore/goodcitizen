import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import RecordForm from "./RecordForm";
import { fetchMembers } from "../store/members";

interface MatchParams {
  chamber?: string;
  name?: string;
}

interface VotingRecordsProps extends RouteComponentProps<MatchParams> {
  fetchMembers: (chamber: string) => void;
}

const VotingRecords: React.FC<VotingRecordsProps> = ({ match, fetchMembers }) => {
  const [currChamber, setChamber] = useState<string>("senate");

  useEffect(() => {
    if (match.params.chamber) {
      setChamber(match.params.chamber);
    }
  }, [match.params.chamber]);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        <div className="break"></div>
        <select id="chamber-select" onChange={handleChange}>
          <option value="senate">Senate</option>
          <option value="house">House</option>
        </select>
      </form>
      <RecordForm chamber={currChamber} name={match.params.name} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMembers: (chamber: string) => dispatch(fetchMembers(chamber)),
  };
};

export default connect(null, mapDispatchToProps)(VotingRecords);
