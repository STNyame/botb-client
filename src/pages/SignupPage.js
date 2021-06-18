import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../store/user/actions";
import { Form, Button } from "react-bootstrap";

export default function SignupPage() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(history, user));
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="name"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/login">Already have an account? click here to log in!</Link>
    </div>
  );
}
