import React, { Component } from "react";
import PatientService from "../../services/patients";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
//import { ToastContainer } from "react-toastr";
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';   
import Moment from 'react-moment';
 
class Profile extends Component {
  constructor(props) {
    super(props);
    this.retrieveUserDetail = this.retrieveUserDetail.bind(this);
    this.handlePassworsSubmit = this.handlePassworsSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
	this.updateTMS = this.updateTMS.bind(this);
    this.state = {
      id : this.props.match.params.id,
      userDetail : {},
      therapies : ''
    };
  }

  componentDidMount() {
    this.retrieveUserDetail();
  }


  retrieveUserDetail() {
    PatientService.get(this.state.id)
      .then(response => {
        if ( response.data.status == true ) {
            console.log('response.data.payload',response.data.payload);
            this.setState({
                userDetail : {
                  name : response.data.payload.name,
                  mobile : response.data.payload.mobile,
                  patient_id : response.data.payload.id,
                  address : response.data.payload.address,
                  reg_date : response.data.payload.reg_date,
                  age : response.data.payload.age,
                  sex : response.data.payload.sex,
                  dr_name : response.data.payload.dr_name,
                  dr_city : response.data.payload.dr_city,
                  dr_mobile : response.data.payload.dr_mobile,
				  asm_name : response.data.payload.asm_name,
				  tsm_name : response.data.payload.tsm_name,
				  tsm_id : response.data.payload.tsm_id,
                },
                therapies : response.data.payload.therapies,
				tsms : response.data.payload.tsms
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
  
  updateTMS(e) {
	  if ( e.target.value != '' ) {
		let data = {
			tsm : e.target.value,
		  };
		  PatientService.update(this.state.id,data)
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
      PatientService.update(this.state.id,data)
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
      PatientService.update(this.state.id,data)
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
    const { roles, region, area, rsms, therapies, tsms } = this.state;
    const getStatus = (id) => {
      switch(id) {
        case '0':   return 'On Therapy';
        case '1':   return 'Discontinued';
        case '2':   return 'Repeated';
        case '3':   return 'Completed';
        default:  return '';
      }
    }
    return (
        <React.Fragment>
            <div class="container-fluid mt--7">
                <div class="row">
                  <div class="col-xl-6 order-xl-2 mb-5 mb-xl-0">
                    <div class="card card-profile shadow">
                      {/* <div class="row justify-content-center">
                        <div class="col-lg-3 order-lg-2">
                          <div class="card-profile-image">
                            <a href="#">
                              <img src="../assets/img/theme/team-4-800x800.jpg" class="rounded-circle"/>
                            </a>
                          </div>
                        </div>
                      </div> */}
                      {/* <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                        <div class="d-flex justify-content-between">
                          <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                          <a href="#" class="btn btn-sm btn-default float-right">Message</a>
                        </div>
                      </div> */}
                      <div class="card-header bg-white border-0">
                        <div class="row align-items-center">
                          <div class="col-8">
                            <h3 class="mb-0">Therapies</h3>
                          </div>
                          <div class="col-4 text-right">
                            {/* <a href="#!" class="btn btn-sm btn-primary">Settings</a> */}
                          </div>
                        </div>
                      </div>

                      <div class="card-body pt-0 pt-md-4">
                        <h6 class="heading-small text-muted mb-4">List</h6>
                        <div class="pl-lg-4">
                          <ul class="list-group">
                            {therapies && therapies.map((therapy, index) => (
                              <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">{therapy.title}</label>
                                <span>{getStatus(therapy.status)}</span>
                              </li>
                            ))}
                            {/* <li class="d-flex justify-content-between align-items-center">
                              <label class="form-control-label" for="input-address">Name</label>
                              <span>Ajay Kumar</span>
                            </li>
                            <li class="d-flex justify-content-between align-items-center">
                              <label class="form-control-label" for="input-address">Age</label>
                              <span>32</span>
                            </li>
                            <li class="d-flex justify-content-between align-items-center">
                              <label class="form-control-label" for="input-address">Sex</label>
                              <span>Male</span>
                            </li>
                            <li class="d-flex justify-content-between align-items-center">
                              <label class="form-control-label" for="input-address">Reg. Date</label>
                              <span>2021-03-05</span>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 order-xl-1">
                    <div class="card bg-secondary shadow">
                      <div class="card-header bg-white border-0">
                        <div class="row align-items-center">
                          <div class="col-8">
                            <h3 class="mb-0">Patient Detail</h3>
                          </div>
                          <div class="col-4 text-right">
                            {/* <a href="#!" class="btn btn-sm btn-primary">Settings</a> */}
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <form>
                          <h6 class="heading-small text-muted mb-4">General information</h6>
                          <div class="pl-lg-4">
                            <ul class="list-group">
                              <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">ID</label>
                                <span>{this.state.userDetail.patient_id}</span>
                              </li>
                              <li class="d-flex justify-content-between align-items-center">
                              <label class="form-control-label" for="input-address">Name</label>
                                <span>{this.state.userDetail.name}</span>
                              </li>
                              <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">Age</label>
                                <span>{this.state.userDetail.age}</span>
                              </li>
                              <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">Sex</label>
                                <span>{ ( this.state.userDetail.sex == 1) ? 'Male' : 'Female' }</span>
                              </li>
                              <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">Reg. Date</label>
                                <span>
                                  <Moment format="YYYY-MM-DD">
                                    {this.state.userDetail.reg_date}
                                  </Moment>
                                </span>
                              </li>
							  <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">ASM</label>
                                <span>{this.state.userDetail.asm_name}</span>
                              </li>
							  <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">TSM</label>
								{ (this.state.userDetail.tsm_id != null)
									? <span>{this.state.userDetail.tsm_name}</span>
									: <select class="" onChange={this.updateTMS}>
										  <option selected value="">Select</option>
										  {tsms && tsms.map((tsms, index) => (
											  <option value={tsms.u_id}>{tsms.u_name}</option>
										  ))}
									  </select>
								}
                              </li>
                            </ul>
                          </div>
                          <hr class="my-4" />
                          <h6 class="heading-small text-muted mb-4">Contact information</h6>
                          <div class="pl-lg-4">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label class="form-control-label" for="input-address">Mobile</label>
                                  <p>{this.state.userDetail.mobile}</p>
                                </div>
                                <div class="form-group">
                                  <label class="form-control-label" for="input-address">Address</label>
                                  <p>{this.state.userDetail.address}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr class="my-4" />
                          <h6 class="heading-small text-muted mb-4">Doctor Detail</h6>
                          <div class="pl-lg-4">
                          <ul class="list-group">
                              <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">Name</label>
                                <span>{this.state.userDetail.dr_name}</span>
                              </li>
                              <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">City</label>
                                <span>{this.state.userDetail.dr_city}</span>
                              </li>
                              <li class="d-flex justify-content-between align-items-center">
                                <label class="form-control-label" for="input-address">Mobile</label>
                                <span>{this.state.userDetail.dr_mobile}</span>
                              </li>
                            </ul>
                          </div>
                        </form>
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