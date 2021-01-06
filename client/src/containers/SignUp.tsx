import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardPrompt from "../components/CardPrompt";

const SignUp = () => {
  return (
    <CardPrompt title="Sign Up">
      <Form>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="John" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" placeholder="Doe" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="johndoe@mail.ca" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Shh..." />
          <Form.Text className="text-muted">
            Must be 8-20 characters, contain a lowercase and uppercase, a number
            and a special character
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Shhh..." />
        </Form.Group>
        <Button variant="info" style={{ width: "100%" }}>
          Sign Up
        </Button>
      </Form>
    </CardPrompt>
  );
};

export default SignUp;
