import React, { Component } from "react";
import Aux from "../../Hoc/ax";
import AppBar from "../Appbar/appBar"

class Layout extends Component {

  render() {
    return (
      <Aux>
          <AppBar style={{position:"fixed"}}/>
        <main style={{minHeight:"640px"}}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
