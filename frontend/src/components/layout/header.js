import React, { Component } from "react";
import Headerbg from "./headerbg";
import Navtop from "./navtop";
import Index from "./index";
class Header extends Component {
    render() {
      return (
        <React.Fragment>
            <Navtop></Navtop>
            <Headerbg></Headerbg>
            <Index></Index>
        </React.Fragment>
      );
    }
}
  
  export default Header;