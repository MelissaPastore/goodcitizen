import "../App.css";
import { Route, Switch } from "react-router-dom";
import RepForm from "./RepForm";
import Welcome from "./Welcome";
import Navbar from "./Navbar";
import VotingRecords from "./VotingRecords";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Fjalla One",`,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <h1 id="header">Good Citizen Assistant</h1>
        </header>
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/reps/selfservice" component={RepForm} />
            <Route path="/records/:name/:chamber" component={VotingRecords} />
            <Route path="/records/" component={VotingRecords} />
            <Route component={Welcome} />
          </Switch>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
