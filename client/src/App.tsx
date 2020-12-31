import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Home from "./containers/Home";
import classes from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    isCreateModalOpen: false,
  };

  toggleCreateModalHandler = () => {
    this.setState({
      isCreateModalOpen: !this.state.isCreateModalOpen,
    });
  };

  render() {
    return (
      <div className={classes.App}>
        <NavBar clickedCreateModal={this.toggleCreateModalHandler} />
        <Modal
          modal={this.state.isCreateModalOpen}
          toggle={this.toggleCreateModalHandler}
        />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
