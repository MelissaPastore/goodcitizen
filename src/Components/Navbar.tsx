import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div>
      <nav id="navbar">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/reps/selfservice">
          Find My Reps
        </Link>
        <Link className="navbar-link" to="/records">
          Voting History
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
