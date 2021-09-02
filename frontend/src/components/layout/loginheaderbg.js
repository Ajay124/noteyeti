import React, { Component } from "react";
import logo from './assets/img/brand/logo.png';
class LoginHeaderbg extends Component {
    render() {
      return (
        <React.Fragment>
          <div className="header bg-gradient-primary py-7 py-lg-8">
            <div className="container">
                <div className="header-body text-center">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-6">
                    <h1 className="text-white"><img style={{height:200}} src={logo} /></h1>
                    {/* <p className="text-lead text-light">Use these awesome forms to login or create new account in your project for free.</p> */}
                    </div>
                </div>
                </div>
            </div>
            <div className="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>
        </React.Fragment>
      );
    }
  }
  
  export default LoginHeaderbg;