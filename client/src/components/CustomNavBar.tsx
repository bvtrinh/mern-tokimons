import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { VscDiffAdded } from "react-icons/vsc";
import { IoLogInOutline, IoPersonAdd, IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import classes from "./CustomNavBar.module.css";

interface Props {
  login: () => void;
  logout: () => void;
  loggedIn: boolean;
}

const CustomNavBar: React.FC<Props> = (props) => {
  const create = props.loggedIn ? (
    <Nav.Link>
      <VscDiffAdded /> Create
    </Nav.Link>
  ) : null;

  const auth = props.loggedIn ? (
    <Nav>
      <Nav.Link>
        <FaUser /> Hello User!
      </Nav.Link>
      <Nav.Link onClick={props.logout}>
        <IoLogOutOutline /> Logout
      </Nav.Link>
    </Nav>
  ) : (
    <Nav>
      <Nav.Link>
        <IoPersonAdd /> Sign Up
      </Nav.Link>
      <Nav.Link onClick={props.login}>
        <IoLogInOutline /> Login
      </Nav.Link>
    </Nav>
  );
  return (
    <div className={classes.bgColor}>
      <Container>
        <Navbar
          collapseOnSelect
          expand="md"
          variant="dark"
          className={classes.bgColor}
        >
          <Navbar.Brand href="#home">
            <img src="/images/full-tokimon.png" alt="brand-logo" width="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">{create}</Nav>
            <Nav>{auth}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default CustomNavBar;
