import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <p>
        The Good Citizen Assistant can help you find your elected officials at
        the national, state and local levels.
      </p>
      <p>How would you like to search?</p>
      <div id="nav">
        <nav>
          <Link className="nav-link" to="/selfservice">
            Self Service
          </Link>
          <Link className="nav-link" to="watson">
            I Want To Chat!
          </Link>
        </nav>
        <img
          alt="statue-of-liberty"
          src="https://images.unsplash.com/photo-1573434490486-3cab65054136?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80"
        />
      </div>
    </div>
  );
};

export default Welcome;
