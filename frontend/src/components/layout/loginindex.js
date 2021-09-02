import React, { Component } from "react";
import * as Cookies from "js-cookie";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
import UserService from "../../services/users";
class LoginIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      userid : '',
      usertype : '',
      type : 0,
      password : '',
      errors : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    console.log('calling',event.target);
    let inputName = event.target.name;
    this.setState({ [inputName] : event.target.value });
    console.log('here is the state',this.state);
  }

  handleSubmit (event) {
    this.setState({ className : '', errors : ''  } );
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({ 'className' : 'was-validated' } );
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      let data = {
        name : this.state.username,
        password : this.state.password
      };
      UserService.login(data)
      .then(response => {
        console.log('response',response.data.status);
        if ( response.data.status == false ) {
          this.setState({ className : 'was-validated', errors : response.data.message  } );
        } else {
          Cookies.remove("session");
          Cookies.set("session", response.data.payload.token, { expires: 2 });
          console.log('cookies',Cookies.get());
          this.props.loggedin();
        }
      })
      .catch(e => {
        console.log(e);
      });
    }
    
  }


  componentDidMount() {
    // this.chart()
    // console.log('this.state',this.state);
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
                        <small>Sign In</small>
                    </div>
                    <div className="text-center">
                      <span style={{color : 'red'}}>{this.state.errors}</span>
                    </div>
                    <Form method="post" className={this.state.className} noValidate validated={this.validated} onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group className="form-group mb-3" as={Col} md="12" controlId="validationCustom02">
                                <div className="input-group input-group-alternative">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="ni ni-mobile-button"></i></span>
                                    </div>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        defaultValue=""
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                <div className="input-group input-group-alternative">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                    </div>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </Form.Group>
                        </Form.Row>
                        {/* <Form.Group>
                            <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            />
                        </Form.Group> */}
                        <div className="text-center">
                          <Button type="submit">Login</Button>
                        </div>
                    </Form>
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