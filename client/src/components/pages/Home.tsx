import React, { Component } from "react";
import TokiList from "../UI/TokiList";
import { getAllTokis } from "../../api/tokimon";
import { Tokimon } from "../../models/tokimon";
import { checkAuth } from "../../utils/auth";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FcSearch } from "react-icons/fc";
import classes from "../../css/Home.module.css";

interface StateTypes {
  tokimons: Tokimon[];
  searchStr: string;
  error: boolean;
  message: string;
}

class Home extends Component<{}, StateTypes> {
  state = {
    tokimons: [] as Tokimon[],
    searchStr: "",
    error: false,
    message: "",
  };

  async componentDidMount() {
    if (checkAuth()) {
      const res = await getAllTokis();

      const tokimons = res.payload as Tokimon[];
      this.setState({
        tokimons: tokimons,
        error: res.error,
        message: res.message,
      });
    }
  }

  // TODO: this shouldn't be type any
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
    const isAuth = checkAuth();
    const filteredTokis = this.state.tokimons ? this.searchResults() : [];
    const tokis =
      filteredTokis.length > 0 ? (
        <TokiList tokimons={filteredTokis} />
      ) : (
        <h2 style={{ textAlign: "center" }}>No Tokimons Found!</h2>
      );
    const search = isAuth ? (
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
        {isAuth ? tokis : null}
      </Container>
    );
  }
}

export default Home;
