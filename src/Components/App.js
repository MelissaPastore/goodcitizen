import "../App.css";
import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import Watson from "./Watson";
import Welcome from "./Welcome";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome To The Good Citizen Assistant!</h1>
      </header>
      <Navbar />
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
