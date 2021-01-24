import React from "react";
import { connect } from "react-redux";
import RecordForm from "./RecordForm";
import { fetchMembers } from "../store/members";

const defaultState = {
  chamber: "senate",
};

class VotingRecords extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
  }
  async handleChange(event) {
    await this.setState({
      chamber: event.target.value,
    });
    await this.props.fetchMembers(this.state.chamber);
  }

  render() {
    return (
      <div>
        <p>This feature is only available for members of U.S. Congress.</p>
        <form>
          <label id="chamber-label" htmlFor="chamber-select">
            Do you want to search Senate or the House?{" "}
          </label>

          <select id="chamber-select" onChange={this.handleChange}>
            <option value="senate">Senate</option>
            <option value="house">House</option>
          </select>
        </form>
        {this.state.chamber && <RecordForm chamber={this.state.chamber} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(VotingRecords);
