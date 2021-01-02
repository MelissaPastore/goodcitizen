import React from "react";
import axios from "axios";
import RepInfo from "./RepInfo";

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
      <div>
        <h2>
          Please enter your address to look up your government representatives.
        </h2>
        <form id="voter-form" onSubmit={this.handleSubmit}>
          <label htmlFor="street1">Street Address 1:</label>
          <input
            name="street1"
            type="text"
            onChange={this.handleChange}
            value={this.state.street1}
          />
          <label htmlFor="street2">Street Address 2:</label>
          <input
            name="street2"
            type="text"
            onChange={this.handleChange}
            value={this.state.street2}
          />

          <label htmlFor="city">City:</label>
          <input
            name="city"
            type="text"
            onChange={this.handleChange}
            value={this.state.city}
          />

          <label htmlFor="state">State:</label>
          <input
            name="state"
            type="text"
            onChange={this.handleChange}
            value={this.state.state}
          />

          <label htmlFor="zip">Zip Code:</label>
          <input
            name="zip"
            type="text"
            onChange={this.handleChange}
            value={this.state.zip}
          />

          <button type="submit" disabled={!this.state.street1}>
            Find My Reps!
          </button>
        </form>
        {this.state.repInfo.normalizedInput && (
          <RepInfo repInfo={this.state.repInfo} />
        )}
      </div>
    );
  }
}

export default Form;
