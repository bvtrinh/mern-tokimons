import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";
import { VscDiffAdded } from "react-icons/vsc";
import { IoLogInOutline, IoPersonAdd, IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import classes from "./CustomNavBar.module.css";

interface Props {
  logout: () => void;
  loggedIn: boolean;
  openCreateModal: () => void;
}

const CustomNavBar: React.FC<Props> = (props) => {
  const create = props.loggedIn ? (
    <Nav.Link onClick={props.openCreateModal}>
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
      <Nav.Link as={NavLink} to="/u/signup">
        <IoPersonAdd /> Sign Up
      </Nav.Link>
      <Nav.Link as={NavLink} to="/u/login">
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
          <NavLink to="/">
            <Navbar.Brand>
              <Image
                fluid
                src="/images/full-tokimon.png"
                alt="brand-logo"
                width="100"
              />
            </Navbar.Brand>
          </NavLink>
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
