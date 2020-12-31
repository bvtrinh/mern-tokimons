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

interface NavBarTypes {
  clickedCreateModal: () => void;
}

const NavBar: React.FC<NavBarTypes> = (props) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleCollapse = () => {
    setOpen(!isOpen);
  };

  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <img src="/images/full-tokimon.png" width="100" alt="img-logo" />
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="/">
              <MDBIcon icon="home" /> Home
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem onClick={props.clickedCreateModal}>
            <MDBNavLink to="">
              <MDBIcon icon="plus-square" /> Create
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to="#!">
              <MDBIcon icon="user-plus" /> Sign Up
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#!">
              <MDBIcon icon="sign-in-alt" /> Login
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default NavBar;
