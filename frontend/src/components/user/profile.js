import React, { Component } from "react";
import UserService from "../../services/users";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
//import { ToastContainer } from "react-toastr";
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';    
class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePassworsSubmit = this.handlePassworsSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name : '',
      mobile : '',
      id : '',
      password : '',
      cpassword : '',
      className : '',
      className1 : '',
    };
  }

  componentDidMount() {
    this.retrieveUserDetail();
  }


  retrieveUserDetail() {
    UserService.getUserDetail({type : 1})
      .then(response => {
        if ( response.data.status == true ) {
            console.log('response.data.payload',response.data.payload);
            this.setState({
                name : response.data.payload.u_name,
                mobile : response.data.payload.u_mobile,
                id : response.data.payload.u_uuid
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleChange(event) {
    let inputName = event.target.name;
    this.setState({ [inputName] : event.target.value });
  }

  handleSubmit (event) {
    this.setState({ className : '', errors : ''  } );
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({ className : 'was-validated' } );
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      let data = {
        mobile : this.state.mobile,
        name : this.state.name,
      };
      UserService.update(this.state.id,data)
      .then(response => {
        if ( response.data.status == false ) {
          toast.error(response.data.message);
          this.setState({ className : 'was-validated'  } );
        } else {
          toast.success(response.data.message);
          //this.props.history.push("/staff");
          this.retrieveUserDetail();
        }
      })
      .catch(e => {
        console.log(e);
      });
    }
  }


  handlePassworsSubmit (event) {
    this.setState({ className1 : '', errors : ''  } );
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({ className : 'was-validated' } );
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      let data = {
        password : this.state.password,
        cpassword : this.state.cpassword,
      };
      UserService.update(this.state.id,data)
      .then(response => {
        if ( response.data.status == false ) {
          toast.error(response.data.message);
          this.setState({ className1 : 'was-validated'  } );
        } else {
          toast.success(response.data.message);
          this.setState({ password : '', cpassword : '' } );
          //this.props.history.push("/staff");
          //this.retrieveUserDetail();
        }
      })
      .catch(e => {
        console.log(e);
      });
    }
  }

  render() {
    const { roles, region, area, rsms, asms } = this.state;
    return (
        <React.Fragment>
            <div class="container-fluid mt--7">
                <div class="row">
                    <div class="col">
                    <div class="card bg-secondary shadow">
                        <div class="card-header bg-white border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                            <h3 class="mb-0">Update Profile</h3>
                            </div>
                            <div class="col-4 text-right">
                                {/* <Link to={"/staff"} className="btn btn-sm btn-primary">
                                    Staff List
                                </Link> */}
                            </div>
                        </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-6 order-xl-1 mb-5 mb-xl-0">
                                    <Form method="post" className={this.state.className} noValidate validated={this.validated} onSubmit={this.handleSubmit}>
                                        <h6 class="heading-small text-muted mb-4">User information</h6>
                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-username">Name</label>
                                                        <input required type="text" name="name" value={this.state.name} class="form-control form-control-alternative" onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-email">Mobile</label>
                                                        <input required type="number" id="input-email" class="form-control form-control-alternative" name="mobile" onChange={this.handleChange} value={this.state.mobile}/>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <button type="submit" class="btn btn-primary my-4">Update</button>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <div class="col-xl-6 order-xl-2 mb-5 mb-xl-0">
                                    <Form method="post" className={this.state.className1} noValidate validated={this.validated} onSubmit={this.handlePassworsSubmit}>
                                        <h6 class="heading-small text-muted mb-4">Change Password</h6>
                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-username">Password</label>
                                                        <input required type="text" name="password" value={this.state.password} class="form-control form-control-alternative" onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-email">Confirm Password</label>
                                                        <input required type="text" id="input-email" class="form-control form-control-alternative" name="cpassword" onChange={this.handleChange} value={this.state.cpassword}/>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <button type="submit" class="btn btn-primary my-4">Update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <Footer></Footer>
                </div>
        </React.Fragment>
    );
  }
}

export default Profile;