import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { connect } from "react-redux";
import { fetchMembers } from "../store/members";
import { fetchRecord, clearRecord } from "../store/records";
import RecordInfo from "./RecordInfo";
import { RootState } from "../store";
import { Member, RecordState } from "../types";

interface RecordFormProps {
  clearRecord: () => void;
  fetchRecord: (member: Member) => void;
  fetchMembers: (chamber: string) => void;
  chamber: string;
  members: Member[];
  record: RecordState;
  name?: string;
}

const RecordForm: React.FC<RecordFormProps> = ({
  clearRecord,
  fetchRecord,
  fetchMembers,
  chamber,
  members,
  record,
  name,
}) => {
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    fetchMembers(chamber);
    if (name) {
      let nameArr = name.split(" ");
      let first = nameArr[0];
      let last: string = "";
      if (nameArr.length === 2) {
        last = nameArr[1];
      } else if (nameArr.length > 2 && nameArr[1].length === 2) {
        last = nameArr[2];
      } else if (nameArr.length > 2) {
        last = nameArr.slice(1).join(" ");
      }
      setFirstName(first);
      setLastName(last);
    }
    return () => {
      clearRecord();
      setFirstName("");
      setLastName("");
    };
  }, [chamber, clearRecord, fetchMembers, name]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "first_name") {
      setFirstName(event.target.value);
    } else if (event.target.name === "last_name") {
      setLastName(event.target.value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await clearRecord();
    let member = members.find((member) => {
      return member.first_name === first_name && member.last_name === last_name;
    });

    if (member) {
      await fetchRecord(member);
    }

    setFullName(`${first_name} ${last_name}`);
    setFirstName("");
    setLastName("");
  };

  const capitalizedChamber = `${chamber.charAt(0).toUpperCase()}${chamber.slice(1)}`;
  return (
    <div id="form-container">
      <form id="record-form" onSubmit={handleSubmit}>
        <p>{`Enter the name of a member of the ${capitalizedChamber} to find their recent voting history.`}</p>
        <div className="break"></div>
        <TextField
          className="input"
          label="First"
          name="first_name"
          type="text"
          value={first_name}
          variant="outlined"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          className="input"
          label="Last"
          name="last_name"
          type="text"
          value={last_name}
          variant="outlined"
          onChange={handleChange}
        />
        <div className="break"></div>
        <Button
          style={{ backgroundColor: "#5386e4" }}
          variant="contained"
          type="submit"
          color="primary"
          size="large"
        >
          Search
        </Button>
      </form>
      {record.details && <RecordInfo name={fullName} />}
      {record.error && <RecordInfo name={fullName} />}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    members: state.members,
    record: state.record,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMembers: (chamber: string) => dispatch(fetchMembers(chamber)),
    fetchRecord: (member: Member) => dispatch(fetchRecord(member)),
    clearRecord: () => dispatch(clearRecord()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordForm);
