import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppBar from "./Component/Appbar/appBar"
import Layout from "./Component/Layout/layout"
import Main from "./Container/MainBody/main"


class App extends Component {
  render() {
    return (
      <div style={{backgroundColor:"#80808024"}}>
        <Layout>
          <Switch>
          <Route path="/" exact component={Main} />
          </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
