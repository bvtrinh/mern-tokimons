import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { VscDiffAdded } from "react-icons/vsc";
import { IoLogInOutline, IoPersonAdd } from "react-icons/io5";
import classes from "./CustomNavBar.module.css";

const CustomNavBar = () => {
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
            <Nav className="mr-auto">
              <Nav.Link href="#features">
                <VscDiffAdded /> Create
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
                <IoPersonAdd /> Sign Up
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                <IoLogInOutline /> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default CustomNavBar;
