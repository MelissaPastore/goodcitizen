import "../App.css";
import { Route, Switch, Link } from "react-router-dom";
import Form from "./Form";
import Watson from "./Watson";
import Welcome from "./Welcome";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome To The Good Citizen Assistant!</h1>
      </header>
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
      <div>
        <Switch>
          <Route exact path="/selfservice" component={Form} />
          <Route exact path="/watson" component={Watson} />
          <Route exact path="/" component={Welcome} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
