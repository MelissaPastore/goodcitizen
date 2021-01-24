import React from "react";
import { connect } from "react-redux";
import RecordForm from "./RecordForm"
import {fetchMembers} from "../store/votingRecs"


const defaultState = {
  chamber: ""
}


class VotingRecords extends React.Component {
  constructor (){
    super()
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
  }
  async handleChange(event) {
    await this.setState({
      chamber: event.target.value,
    });
    await this.props.fetchMembers(this.state.chamber)
  }


  render () {
    return (
      <div>
        <p>
         Look up the voting records for your members of Congress.
        </p>
        <label htmlFor="chamber-select">Are you searching the Senate or the House?</label>
<form>
<select id="chamber-select" onChange={this.handleChange}>
    <option value="senate">Senate</option>
    <option value="house">House</option>
</select>
</form>
        {this.state.chamber && <RecordForm chamber ={this.state.chamber}/>}
      </div>

    )
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


