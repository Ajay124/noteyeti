import React, { Component } from "react";
import LoginHeaderbg from "./loginheaderbg";
import LoginNavtop from "./loginnavtop";
import LoginIndex from "./loginindex";
class LoginHeader extends Component {
    render() {
      return (
        <React.Fragment>
            {/* <LoginNavtop></LoginNavtop> */}
            <LoginHeaderbg></LoginHeaderbg>
            <LoginIndex></LoginIndex>
        </React.Fragment>
      );
    }
}
  
  export default LoginHeader;