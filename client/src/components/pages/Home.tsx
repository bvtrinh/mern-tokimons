import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
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
import { ResponseFormat } from "../../models/response";

interface HomeProps extends RouteComponentProps {
  createSubmit: boolean;
  toggleCreateSubmitHandler: () => void;
  setAlertHandler: (res: ResponseFormat) => void;
}
interface StateTypes {
  tokimons: Tokimon[];
  searchStr: string;
}

class Home extends Component<HomeProps, StateTypes> {
  state = {
    tokimons: [] as Tokimon[],
    searchStr: "",
  };

  async getTokimons() {
    const res = await getAllTokis();
    if (res.statusCode === 401) this.props.setAlertHandler(res);

    const tokimons = res.payload as Tokimon[];
    this.setState({
      tokimons: tokimons,
    });
  }

  componentDidMount() {
    if (checkAuth()) {
      this.getTokimons();
    }
  }

  componentDidUpdate() {
    if (this.props.createSubmit) {
      this.getTokimons();
      this.props.toggleCreateSubmitHandler();
    }
  }

  searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchStr: e.currentTarget.value });
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
