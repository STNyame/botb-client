import { Button, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";

export default function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logOut());
    console.log(user);
  };
  return (
    <Nav justify activeKey="/">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
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
