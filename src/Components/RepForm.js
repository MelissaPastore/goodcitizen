import React from "react";
import RepInfo from "./RepInfo";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchRepInfo } from "../store/repInfo";

const defaultState = {
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
};

class RepForm extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const address = `${this.state.street1} ${this.state.street2} ${this.state.city} ${this.state.state} ${this.state.zip}`;
    await this.props.fetchRepInfo(address);
    this.setState(defaultState);
  }

  render() {
    return (
      <div id="form-container">
        <h2>Please enter your address to look up your representatives.</h2>
        <form id="voter-form" onSubmit={this.handleSubmit}>
          <TextField
            className="input"
            label="Street Address 1"
            name="street1"
            type="text"
            onChange={this.handleChange}
            value={this.state.street1}
            variant="filled"
          />

          <TextField
            className="input"
            label="Street Address 2"
            name="street2"
            type="text"
            onChange={this.handleChange}
            value={this.state.street2}
            variant="filled"
          />
          <TextField
            className="input"
            label="City"
            name="city"
            type="text"
            onChange={this.handleChange}
            value={this.state.city}
            variant="filled"
          />
          <TextField
            className="input"
            label="State"
            name="state"
            type="text"
            onChange={this.handleChange}
            value={this.state.state}
            variant="filled"
          />
          <TextField
            className="input"
            label="Zip"
            name="zip"
            type="text"
            onChange={this.handleChange}
            value={this.state.zip}
            variant="filled"
          />
          <div className="break"></div>
          <Button
            style={{ backgroundColor: "#5386e4" }}
            variant="contained"
            type="submit"
            disabled={!this.state.street1}
            color="primary"
            size="small"
          >
            Find My Reps!
          </Button>
        </form>
        {this.props.repInfo.normalizedInput && <RepInfo />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    repInfo: state.repInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRepInfo: (address) => dispatch(fetchRepInfo(address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepForm);
