import React from "react";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import {fetchMembers} from "../store/votingRecs"

const defaultState = {
  name: ""
};

class RecordForm extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
  }
async componentDidMount () {
  await this.props.fetchMembers(this.props.chamber);
}

  render() {
    return (
      <div id="form-container">
        <h2>Enter the name of a member of Congress to find their voting history.</h2>
        <form id="voter-form" onSubmit={this.handleSubmit}>
          <TextField
            className="input"
            label="Name"
            name="name"
            type="text"
            value={this.state.name}
            variant="filled"
          />
          <div className="break"></div>
          <Button
            style={{ backgroundColor: "#5386e4" }}
            variant="contained"
            type="submit"
            disabled={!this.state.name}
            color="primary"
            size="small"
          >
            Find Voting Records!
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    members: state.members,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembers: (chamber) => dispatch(fetchMembers(chamber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordForm);


