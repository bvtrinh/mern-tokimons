import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import CustomNavBar from "./components/CustomNavBar";
import TokiModal from "./components/TokiModal";
import TokiInfo from "./components/TokiInfo";
import TokiForm from "./components/Forms/TokiForm";
import PrivateRoute from "./components/PrivateRoute";
import { logout } from "./api/User.api";
import { ResponseFormat } from "./models/Response";
import { TokimonFormValues, FullTokimon } from "./models/Tokimon";
import { createToki } from "./api/Tokimon.api";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import classes from "./App.module.css";
import { checkAuth } from "./utils/auth";

interface StateTypes {
  isAuth: boolean;
  isCreateModalOpen: boolean;
  error: boolean;
  message: string;
  submitted: boolean;
}
interface Props {}

class App extends Component<Props, StateTypes> {
  state = {
    isAuth: checkAuth(),
    isCreateModalOpen: false,
    error: false,
    message: "",
    submitted: false,
  };

  toggleAuthHandler = () => {
    this.setState((prevState: StateTypes) => ({ isAuth: !prevState.isAuth }));
  };

  toggleCreateModalHandler = () => {
    this.setState({
      isCreateModalOpen: !this.state.isCreateModalOpen,
    });
  };

  logoutHandler = async () => {
    const res = await logout();
    this.responseHandler(res);

    if (res.statusCode === 200) {
      return <Redirect to="/login" />;
    }
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
      this.setState({ submitted: true, error: false, message: res.message });
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
          isAuth={this.state.isAuth}
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
            path="/u/login"
            render={(props) => (
              <Login setStateAuth={this.toggleAuthHandler} {...props} />
            )}
          />
          <Route path="/u/signup" component={SignUp} />
          <PrivateRoute>
            <Switch>
              <Route path="/t/:id" component={TokiInfo} />
              <Route exact path="/" component={Home} />
            </Switch>
          </PrivateRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
