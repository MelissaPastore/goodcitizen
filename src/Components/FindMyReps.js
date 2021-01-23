import React from "react";
import { Link } from "react-router-dom";

class FindMyReps extends React.Component {
  render() {
    return (
      <div>
        <p>
          The Good Citizen Assistant can help you find your elected officials at
          the national, state and local levels.
        </p>
        <p>How would you like to search?</p>
        <div>
          <nav id="rep-nav">
            <Link className="nav-link" to="/selfservice">
              Self Service
            </Link>
            <Link className="nav-link" to="watson">
              I Want To Chat!
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}

export default FindMyReps;
