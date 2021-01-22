import "../App.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav id="navbar">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/selfservice">
          Self Service
        </Link>
        <Link className="navbar-link" to="/watson">
          Chat
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
