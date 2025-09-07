import React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@mui/material";
import { RootState } from "../store";
import { RecordState } from "../types";

interface RecordInfoProps {
  record: RecordState;
  name: string;
}

const RecordInfo: React.FC<RecordInfoProps> = ({ record, name }) => {
  const votes = record.details;
  const error = record.error;

  return (
    <div>
      {error ? (
        <div id="record-error">
          We couldn't find a voting history for that person. Please make sure
          you were searching the correct chamber of Congress and that the person
          is a current member of Congress.
        </div>
      ) : (
        <div id="record-info">
          <p>{`Here is the recent voting record for ${name}`}:</p>
          <Table stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Date of Vote</TableCell>
                <TableCell>Voted</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {votes?.map((vote, index) => {
                const date = new Date(vote.date);

                return (
                  <TableRow key={index}>
                    <TableCell>
                      {vote.bill.title ? vote.bill.title : vote.description}
                    </TableCell>
                    <TableCell>{date.toLocaleDateString()}</TableCell>
                    <TableCell>{vote.position}</TableCell>
                    <TableCell>{vote.result}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>{" "}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    record: state.record,
  };
};

export default connect(mapStateToProps)(RecordInfo);
