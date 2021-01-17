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
import { logout, refreshTokens } from "./api/User.api";
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

// Get refresh token every 13m
const REFRESH_TIME = 1000 * 60 * 13;

class App extends Component<{}, StateTypes> {
  state = {
    isAuth: checkAuth(),
    isCreateModalOpen: false,
    error: false,
    message: "",
    submitted: false,
  };

  private timer: any;

  componentDidMount() {
    if (this.state.isAuth) {
      this.timer = setInterval(async () => {
        const res = await refreshTokens();

        if (res.statusCode === 503) {
          clearInterval(this.timer);
          this.setAlertHandler(res);
        }
      }, REFRESH_TIME);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    if (this.state.message) {
      setTimeout(() => {
        this.setState({ message: "" });
      }, 5000);
    }
  }

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
    this.setAlertHandler(res);
    this.setState({ isAuth: false });
    clearInterval(this.timer);

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
    this.setAlertHandler(res);
    this.toggleCreateModalHandler();
  };

  setAlertHandler = (res: ResponseFormat) => {
    this.setState({
      submitted: true,
      error: res.error,
      message: res.message,
    });
    // The user is in a place they shouldn't be
    if (res.statusCode === 401) {
      return <Redirect to="/u/login" />;
    }
  };

  render() {
    const alert = this.state.message ? (
      <Alert
        onClose={() => this.setState({ message: "" })}
        dismissible
        className="mt-3"
        variant={this.state.error ? "danger" : "success"}
      >
        {this.state.error ? `Error: ${this.state.message}` : this.state.message}
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
              <Login
                setAlertHandler={this.setAlertHandler}
                setStateAuth={this.toggleAuthHandler}
                {...props}
              />
            )}
          />
          <Route
            path="/u/signup"
            render={(props) => (
              <SignUp
                setAlertHandler={this.setAlertHandler}
                setStateAuth={this.toggleAuthHandler}
                {...props}
              />
            )}
          />
          <PrivateRoute>
            <Switch>
              <Route
                path="/t/:id"
                render={(props) => (
                  <TokiInfo setAlertHandler={this.setAlertHandler} {...props} />
                )}
              />
              <Route exact path="/" component={Home} />
            </Switch>
          </PrivateRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
