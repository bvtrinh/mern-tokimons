import React, { Component } from "react";
import CustomNavBar from "./components/CustomNavBar";
import Home from "./containers/Home";
import classes from "./App.module.css";
import { Route, Switch } from "react-router-dom";

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
        <CustomNavBar />
        {/* <TokiModal /> */}
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
