import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardPrompt from "../components/CardPrompt";

const Login = () => {
  const loginHandler = () => {
    console.log("Login...");
  };

  return (
    <CardPrompt title="Login">
      <Form onSubmit={loginHandler}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="johndoe@mail.ca" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Shh..." />
        </Form.Group>
        <Button type="Submit" variant="info" style={{ width: "100%" }}>
          Login
        </Button>
      </Form>
    </CardPrompt>
  );
};

export default Login;
