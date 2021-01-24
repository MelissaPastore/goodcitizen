import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@material-ui/core";

import { connect } from "react-redux";

class RecordInfo extends React.Component {



  render () {
    const votes = this.props.record;

    return (
      <div>
        <div>
          <p>{`Here is the recent voting record for ${this.props.name}`}:</p>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Date of Vote</TableCell>
                <TableCell>Voted</TableCell>
                <TableCell>Result</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {votes.map((vote, index) => {
                const date = new Date(vote.date);

                return (
                  <TableRow key={index}>
                    <TableCell>
                      {vote.bill.title ? vote.bill.title : vote.description}
                    </TableCell>
                    <TableCell>{date.toLocaleDateString()}</TableCell>
                    <TableCell>{vote.position}</TableCell>
                    <TableCell>
                      {vote.result}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>{" "}
        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    record: state.record,
  };
};

export default connect(mapStateToProps)(RecordInfo);
