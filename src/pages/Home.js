import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut } from "../store/player/actions";
import { selectPlayer } from "../store/player/selectors";
import { useEffect } from "react";

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const handleClick = () => {
    dispatch(signOut(player.id));
    console.log(player);
  };

  useEffect(() => {
    !player.id && history.push("/");
  }, [player]);
  return (
    <div>
      <h1>HomePage!</h1>
      <button onClick={handleClick}>Sign out</button>
    </div>
  );
}
