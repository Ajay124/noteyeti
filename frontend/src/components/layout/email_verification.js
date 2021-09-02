import React, { Component } from "react";
import * as Cookies from "js-cookie";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
import UserService from "../../services/users";
import {  toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css'; 

class LoginIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : this.props.match.params.id,
      message : ''
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck (event) {
    //this.setState({ className : '', errors : ''  } );
    if ( this.state.id ) {
      UserService.verifyEmail( { id : this.state.id } )
      .then(response => {
		  console.log('response',response);
          if ( response.data.status == false ) {
            toast.error(response.data.message);
            this.setState({ message : response.data.message  } );
          } else {
            toast.success(response.data.message);
            this.setState({ message : response.data.message  } );
          }
      })
      .catch(e => {
          console.log(e);
      });
    } else {
      
    }
  }


  componentDidMount() {
    this.handleCheck();
  }

  // componentWillMount() {
  //   this.chart()
  // }
  
    render() {
      return (
        <React.Fragment>
          <div className="container mt--8 pb-5">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7">
                <div className="card bg-secondary shadow border-0">
                    <div className="card-body px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <small>Verification Status</small>
                    </div>
                    <div className="text-center">
                      <span style={{color : 'red'}}>{this.state.errors}</span>
                    </div>
                    <p>{this.state.message}</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
      {/* <Footer></Footer> */}
        </React.Fragment>
      );
    }
  }
  
  export default LoginIndex;