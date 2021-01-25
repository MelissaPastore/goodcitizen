import React from "react";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchMembers } from "../store/members";
import { fetchRecord, clearRecord } from "../store/records";
import RecordInfo from "./RecordInfo";

const defaultState = {
  first_name: "",
  last_name: "",
  name: "",
};

class RecordForm extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    await this.props.clearRecord();
    await this.props.fetchMembers(this.props.chamber);
    let name;
    if (this.props.name) {
      name = this.props.name;
      let nameArr = name.split(" ");
      let first = nameArr[0];
      let last;
      if (nameArr.length === 2) {
        last = nameArr[1];
      } else if (nameArr.length > 2 && nameArr[1].length === 2) {
        last = nameArr[2];
      } else if (nameArr.length > 2) {
        last = nameArr.slice(1).join(" ");
      }
      this.setState({ first_name: first, last_name: last });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.clearRecord();
    let member = this.props.members.find((member) => {
      return (
        member.first_name === this.state.first_name &&
        member.last_name === this.state.last_name
      );
    });

    await this.props.fetchRecord(member);

    this.setState({
      name: `${this.state.first_name} ${this.state.last_name}`,
      first_name: "",
      last_name: "",
    });
  }

  render() {
    let chamber = this.props.chamber;
    chamber = `${chamber.charAt(0).toUpperCase()}${chamber.slice(1)}`;
    return (
      <div id="form-container">
        <p>{`Enter the name of a member of the ${chamber} to find their recent voting history.`}</p>
        <form id="record-form" onSubmit={this.handleSubmit}>
          <TextField
            className="input"
            label="First Name"
            name="first_name"
            type="text"
            value={this.state.first_name}
            variant="outlined"
            onChange={this.handleChange}
          />
          <TextField
            className="input"
            label="Last Name"
            name="last_name"
            type="text"
            value={this.state.last_name}
            variant="outlined"
            onChange={this.handleChange}
          />

          <Button
            style={{ backgroundColor: "#5386e4" }}
            variant="contained"
            type="submit"
            disabled={!this.state.first_name}
            color="primary"
            size="large"
          >
            Find Voting Records!
          </Button>
        </form>
        {this.props.record.details && <RecordInfo name={this.state.name} />}
        {this.props.record.error && <RecordInfo name={this.state.name} />}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    members: state.members,
    record: state.record,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembers: (chamber) => dispatch(fetchMembers(chamber)),
    fetchRecord: (member) => dispatch(fetchRecord(member)),
    clearRecord: () => dispatch(clearRecord()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordForm);
