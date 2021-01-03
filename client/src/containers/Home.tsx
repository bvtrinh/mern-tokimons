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
import { getAllTokis } from "../api/Tokimon.api";

import classes from "./Home.module.css";

interface Props {
  loggedIn: boolean;
}

interface StateTypes {
  tokimons: Tokimon[];
  searchStr: string;
}

class Home extends Component<Props, StateTypes> {
  state = {
    tokimons: [] as Tokimon[],
    searchStr: "",
  };

  // On render we should retrieve the tokimons
  async componentDidMount() {
    // Make api call to get Tokimons and store in state
    const res = await getAllTokis();
    const tokimons: Tokimon[] = res?.data.tokimons;
    console.log(tokimons);
    this.setState({ tokimons: tokimons });
  }

  searchHandler = (e: any) => {
    this.setState({ searchStr: e.target.value });
  };

  searchResults = () => {
    const substr = this.state.searchStr;
    return this.state.tokimons.filter((t) => {
      return t.name.toLowerCase().includes(substr);
    });
  };

  render() {
    const filteredTokis = this.searchResults();
    const tokis =
      filteredTokis.length > 0 ? (
        <TokiList tokimons={filteredTokis} />
      ) : (
        <h2 style={{ textAlign: "center" }}>No Tokimons Found!</h2>
      );
    const search = this.props.loggedIn ? (
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          onChange={this.searchHandler}
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
        {this.props.loggedIn ? tokis : null}
      </Container>
    );
  }
}

export default Home;
