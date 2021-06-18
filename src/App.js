import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} exact />
        </Switch>
      </header>
    </div>
  );
}

export default App;
