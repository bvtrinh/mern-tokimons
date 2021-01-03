import React, { Component } from "react";
import CustomNavBar from "./components/CustomNavBar";
import Home from "./containers/Home";
import classes from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import TokiModal from "./components/TokiModal";
import TokiInfo from "./components/TokiInfo";

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
        ></TokiModal>
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
