import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FcSearch } from "react-icons/fc";

import classes from "./Home.module.css";

class Home extends Component {
  state = {
    loggedIn: false,
  };

  render() {
    const search = this.state.loggedIn ? (
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for your Tokimons!"
          aria-label="tokimon-search"
        />
        <InputGroup.Append>
          <Button variant="outline-primary">
            <FcSearch />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    ) : null;
    return (
      <Container>
        <Jumbotron className={classes.Jumbotron}>
          <Image fluid src="/images/full-tokimon.png" alt="jumbo-logo" />
          <hr />
          <h3>Welcome to the world of Tokimons!</h3>
        </Jumbotron>
        {search}
      </Container>
    );
  }
}

export default Home;
