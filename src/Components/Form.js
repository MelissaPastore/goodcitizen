import React from "react";
import axios from "axios";
import RepInfo from "./RepInfo";
import { Button, TextField } from "@material-ui/core";

const apiKey = "AIzaSyDjlaoJuNCzeIuVCLilYlSUIGSVMF0lFzA";

const defaultState = {
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
  repInfo: {},
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchVoterInfo = this.fetchVoterInfo.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async fetchVoterInfo(address) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/civicinfo/v2/representatives`,
        {
          params: {
            address,
            key: apiKey,
          },
        }
      );

      this.setState({ repInfo: res.data });
    } catch (err) {
      console.log("There was an error getting the voter info", err);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const address = `${this.state.street1} ${this.state.street2} ${this.state.city} ${this.state.state} ${this.state.zip}`;
    this.fetchVoterInfo(address);
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
            variant="contained"
            type="submit"
            disabled={!this.state.street1}
            color="primary"
            size="small"
          >
            Find My Reps!
          </Button>
        </form>
        {this.state.repInfo.normalizedInput && (
          <RepInfo repInfo={this.state.repInfo} />
        )}
      </div>
    );
  }
}

export default Form;
