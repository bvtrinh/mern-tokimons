import React, { Component } from "react";
import CustomNavBar from "./components/CustomNavBar";
import Home from "./containers/Home";
import classes from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import TokiModal from "./components/TokiModal";
import TokiInfo from "./components/TokiInfo";
import TokiForm from "./components/Forms/TokiForm";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { ResponseFormat } from "./models/Response";
import { TokimonFormValues, FullTokimon } from "./models/Tokimon";
import { createToki } from "./api/Tokimon.api";

interface StateTypes {
  isCreateModalOpen: boolean;
  loggedIn: boolean;
  error: boolean;
  message: string;
  submitted: boolean;
}
interface Props {}

class App extends Component<Props, StateTypes> {
  state = {
    isCreateModalOpen: false,
    loggedIn: true,
    error: false,
    message: "",
    submitted: false,
  };

  toggleCreateModalHandler = () => {
    this.setState({
      isCreateModalOpen: !this.state.isCreateModalOpen,
    });
  };

  loginHandler = () => {
    this.setState({ loggedIn: true });
  };

  logoutHandler = () => {
    this.setState({ loggedIn: false });
  };

  createSubmitHandler = async (values: TokimonFormValues) => {
    // Format data for API call
    const {
      name,
      height,
      weight,
      electric,
      fly,
      fight,
      fire,
      ice,
      water,
    } = values;
    const elements = { electric, fly, fight, fire, ice, water };
    const toki: FullTokimon = {
      name,
      height,
      weight,
      elements,
    };
    const res = await createToki(toki);
    this.responseHandler(res);
    this.toggleCreateModalHandler();
  };

  responseHandler = (res: ResponseFormat) => {
    if (res.statusCode === 200) {
      this.setState({ submitted: true, error: false });
    } else {
      this.setState({
        submitted: true,
        error: res.error,
        message: res.message,
      });
    }
  };

  render() {
    const alert = this.state.submitted ? (
      <Alert
        onClose={() => this.setState({ submitted: false })}
        dismissible
        className="mt-3"
        variant={this.state.error ? "danger" : "success"}
      >
        {this.state.error
          ? `Creation Error: ${this.state.message}`
          : this.state.message}
      </Alert>
    ) : null;

    return (
      <div className={classes.App}>
        <CustomNavBar
          loggedIn={this.state.loggedIn}
          login={this.loginHandler}
          logout={this.logoutHandler}
          openCreateModal={this.toggleCreateModalHandler}
        />
        <Container>{alert}</Container>
        <TokiModal
          show={this.state.isCreateModalOpen}
          onHide={this.toggleCreateModalHandler}
          title="Create a Tokimon!"
        >
          <TokiForm
            submit={this.createSubmitHandler}
            toggleModal={this.toggleCreateModalHandler}
          />
        </TokiModal>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Home loggedIn={this.state.loggedIn} />}
          />
          <Route path="/t/:id" component={TokiInfo} />
        </Switch>
      </div>
    );
  }
}

export default App;
