import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";
import { useEffect } from "react";

export default function Lobby() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logOut());
    console.log(user);
  };

  useEffect(() => {
    !user.id && history.push("/login");
  }, [user]);
  return <div></div>;
}
