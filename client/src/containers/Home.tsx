import React, { Component } from "react";
import { MDBContainer, MDBJumbotron } from "mdbreact";
import classes from "./Home.module.css";

class Home extends Component {
  state = {
    loggedIn: false,
  };

  render() {
    return (
      <MDBJumbotron className={classes.Jumbotron}>
        <MDBContainer>
          <img
            src="/images/full-tokimon.png"
            alt="Home Logo"
            className="img-fluid mx-auto d-block"
          />
          <hr />
          <h3>Welcome to the world of Tokimons!</h3>
        </MDBContainer>
      </MDBJumbotron>
    );
  }
}

export default Home;
