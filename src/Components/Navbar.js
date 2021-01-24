import "../App.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav id="navbar">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/reps">
          Find My Reps
        </Link>
        <Link className="navbar-link" to="/records">
          Voting Records
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
