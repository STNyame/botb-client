import { Button, Image, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import "./NavBar.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logOut(history));
  };
  return (
    <Nav className="nav-style" justify activeKey="/">
      {!user.id && (
        <>
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav.Item>
        </>
      )}
      {user.name && (
        <>
          <Nav.Item>
            <Image
              src={user.imageUrl}
              style={{ width: "50px" }}
              roundedCircle
            />
          </Nav.Item>

          <Nav.Item>
            <Nav.Link disabled>Welcome, {user.name}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Button onClick={handleClick}>Log out</Button>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}
