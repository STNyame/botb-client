import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Lobby from "./pages/Lobby";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserWithStoredToken } from "./store/user/actions";

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserWithStoredToken(history));
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Switch>
          <Route path="/" component={Lobby} exact />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </header>
    </div>
  );
}
