import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import TokiInfo from "./components/pages/TokiInfo";
import CustomNavBar from "./components/UI/CustomNavBar";
import TokiModal from "./components/UI/TokiModal";
import TokiForm from "./components/forms/TokiForm";
import PrivateRoute from "./components/general/PrivateRoute";
import { TokimonFormValues, FullTokimon } from "./models/tokimon";
import { ResponseFormat } from "./models/response";
import { logout, refreshTokens } from "./api/user";
import { createToki } from "./api/tokimon";
import { checkAuth, clearAuth } from "./utils/auth";
import { REFRESH_TIME } from "./config/constants";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

interface StateTypes {
  isAuth: boolean;
  isCreateModalOpen: boolean;
  error: boolean;
  message: string;
  submitted: boolean;
}

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
    this.setState((prevState: StateTypes) => ({
      isCreateModalOpen: !prevState.isCreateModalOpen,
    }));
  };

  toggleCreateSubmitHandler = () => {
    this.setState((prevState: StateTypes) => ({
      submitted: !prevState.submitted,
    }));
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
    if (res.statusCode === 401) {
      clearAuth();
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
      <React.Fragment>
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
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home
                    toggleCreateSubmitHandler={this.toggleCreateSubmitHandler}
                    setAlertHandler={this.setAlertHandler}
                    createSubmit={this.state.submitted}
                    {...props}
                  />
                )}
              />
            </Switch>
          </PrivateRoute>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
