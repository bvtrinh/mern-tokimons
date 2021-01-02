import React, { Component } from "react";
import CustomNavBar from "./components/CustomNavBar";
import Home from "./containers/Home";
import classes from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import TokiForm from "./components/TokiForm";
import TokiModal from "./components/TokiModal";

class App extends Component {
  state = {
    isCreateModalOpen: false,
    loggedIn: true,
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

  render() {
    return (
      <div className={classes.App}>
        <CustomNavBar
          loggedIn={this.state.loggedIn}
          login={this.loginHandler}
          logout={this.logoutHandler}
          openCreateModal={this.toggleCreateModalHandler}
        />
        <TokiModal
          show={this.state.isCreateModalOpen}
          onHide={this.toggleCreateModalHandler}
          title="Create a Tokimon!"
        >
          <TokiForm toggleModal={this.toggleCreateModalHandler} />
        </TokiModal>
        <Switch>
          <Route
            path="/"
            component={() => <Home loggedIn={this.state.loggedIn} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
