import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../store/player/actions";

export default function SignIn() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [tribe, setTribe] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(history, name, tribe));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Tribe:</label>
      <input
        type="number"
        value={tribe}
        onChange={(e) => setTribe(e.target.value)}
      ></input>
      <button type="submit">submit</button>
    </form>
  );
}
