import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FcSearch } from "react-icons/fc";
import TokiList from "../components/TokiList";
import { Tokimon } from "../models/Tokimon";

import classes from "./Home.module.css";

interface Props {
  loggedIn: boolean;
}

interface StateTypes {
  tokimons: Tokimon[];
}

class Home extends Component<Props, StateTypes> {
  state = {
    tokimons: [
      { id: "a1", name: "Lapras", type: "water", value: 80 },
      { id: "a2", name: "Charizard", type: "fire", value: 95 },
      { id: "a3", name: "Electivire", type: "electric", value: 90 },
      { id: "a4", name: "Articuno", type: "ice", value: 99 },
    ],
  };

  // On render we should retrieve the tokimons
  componentDidMount() {
    // Make api call to get Tokimons and store in state
  }

  render() {
    const tokis =
      this.state.tokimons.length > 0 ? (
        <TokiList tokimons={this.state.tokimons} />
      ) : null;
    const search = this.props.loggedIn ? (
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
        {tokis}
      </Container>
    );
  }
}

export default Home;
