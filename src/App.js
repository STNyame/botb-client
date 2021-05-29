import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={SignIn} exact />
        </Switch>
      </header>
    </div>
  );
}

export default App;
