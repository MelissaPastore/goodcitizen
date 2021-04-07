import "../App.css";
import { Route, Switch } from "react-router-dom";
import RepForm from "./RepForm";
import Watson from "./Watson";
import Welcome from "./Welcome";
import Navbar from "./Navbar";
import FindMyReps from "./FindMyReps";
import VotingRecords from "./VotingRecords";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="header">Good Citizen Assistant</h1>
      </header>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/reps" component={FindMyReps} />
          <Route exact path="/reps/selfservice" component={RepForm} />
          <Route exact path="/reps/watson" component={Watson} />
          <Route path="/records/:name/:chamber" component={VotingRecords} />
          <Route path="/records/" component={VotingRecords} />
          <Route component={Welcome} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
