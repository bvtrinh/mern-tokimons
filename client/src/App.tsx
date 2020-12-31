import React from "react";
import { MDBContainer, MDBJumbotron } from "mdbreact";
import NavBar from "./components/NavBar";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.App}>
      <NavBar />
      <MDBJumbotron className={classes.jumbotron}>
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
    </div>
  );
}

export default App;
