import React, { useState, useEffect } from "react";
import RepInfo from "./RepInfo";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchRepInfo, clearRepInfo } from "../store/repInfo";

const RepForm = ({ clearRepInfo, fetchRepInfo, repInfo }) => {
  const [state, setState] = useState({
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    clearRepInfo();
  }, [clearRepInfo]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await clearRepInfo();
    const address = `${state.street1} ${state.street2} ${state.city} ${state} ${state.zip}`;
    await fetchRepInfo(address);
    setState({ street1: "", street2: "", city: "", state: "", zip: "" });
  };

  return (
    <div>
      <div id="form-container">
        <hr />
        <form id="voter-form" onSubmit={handleSubmit}>
          <h2>Please enter your address to look up your representatives.</h2>
          <div className="break"></div>
          <TextField
            className="input"
            label="Street 1"
            name="street1"
            type="text"
            onChange={handleChange}
            value={state.street1}
            variant="outlined"
          />

          <TextField
            className="input"
            label="Street 2"
            name="street2"
            type="text"
            onChange={handleChange}
            value={state.street2}
            variant="outlined"
          />
          <TextField
            className="input"
            label="City"
            name="city"
            type="text"
            onChange={handleChange}
            value={state.city}
            variant="outlined"
          />
          <TextField
            className="input"
            label="State"
            name="state"
            type="text"
            onChange={handleChange}
            value={state.state}
            variant="outlined"
          />
          <TextField
            className="input"
            label="Zip"
            name="zip"
            type="text"
            onChange={handleChange}
            value={state.zip}
            variant="outlined"
          />
          <div className="break"></div>
          <Button
            style={{ backgroundColor: "#5386e4" }}
            variant="contained"
            type="submit"
            color="primary"
            size="small"
          >
            Search
          </Button>
        </form>
        {repInfo.details && <RepInfo />}
        {repInfo.error && <RepInfo />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    repInfo: state.repInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRepInfo: (address) => dispatch(fetchRepInfo(address)),
    clearRepInfo: () => dispatch(clearRepInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepForm);
