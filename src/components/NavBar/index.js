import userEvent from "@testing-library/user-event";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

export default function NavBar() {
  const user = useSelector(selectUser);
  return (
    <Nav justify activeKey="/">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/signup">Signup</Nav.Link>
      </Nav.Item>
      {user.name && (
        <Nav.Item>
          <Nav.Link disabled href="/signup">
            Welcome, {user.name}
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}
