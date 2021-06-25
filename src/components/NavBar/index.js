import { Button, Image, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logOut(history));
    console.log(user);
  };
  return (
    <Nav style={{ padding: "10px 0" }} justify activeKey="/">
      {!user.id && (
        <>
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
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
            <Nav.Link href="/">Home</Nav.Link>
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
