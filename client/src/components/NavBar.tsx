import React, { useState } from "react";
import {
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleCollapse = () => {
    setOpen(!isOpen);
  };

  return (
    <Router>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <img src="/images/full-tokimon.png" width="100" alt="img-logo" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!">
                <MDBIcon icon="home" /> Home
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">
                <MDBIcon icon="plus-square" /> Create
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right></MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  );
};

export default NavBar;
