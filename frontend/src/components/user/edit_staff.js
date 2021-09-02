import React, { Component } from "react";
import UserService from "../../services/users";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
//import { ToastContainer } from "react-toastr";
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';    
class AddStaff extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      id : this.props.match.params.id,
      name : '',
      mobile : '',
      type : '',
      type_id : '',
      // region : '',
      // area : '',
      state : '',
      city : '',
      rsm_name : '',
      asm_name : '',
      className : '',
      asms : '',
      tsms : '',
      rsms : '',
      rsm : ''
    };
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
        rsm : this.state.rsm,
      };

      UserService.update( this.state.id, data )
      .then(response => {
        if ( response.data.status == false ) {
          toast.error(response.data.message);
          this.setState({ className : 'was-validated'  } );
        } else {
          toast.success(response.data.message);
          this.retrieveUserDetail();
          //this.props.history.push("/staff");
        }
      })
      .catch(e => {
        console.log(e);
      });
    }
    
  }

  componentDidMount() {
    this.retrieveUserDetail();
  }


  retrieveUserDetail() {
    UserService.get(this.state.id)
      .then(response => {
        console.log('response.data',response.data);
        if ( response.data.status == true ) {
            this.setState({
                name : response.data.payload.u_name,
                mobile : response.data.payload.u_mobile,
                type : response.data.payload.ur_title,
                // region : response.data.payload.rg_title,
                // area : response.data.payload.ar_title,
                state : response.data.payload.state_name,
                city : response.data.payload.city_name,
                rsm_name : response.data.payload.rsm_name,
                asm_name : response.data.payload.asm_name,
                type_id : response.data.payload.u_fk_ur_id,
                asms : response.data.payload.asms ?? '',
                tsms : response.data.payload.tsms ?? '',
            }, () => {
              UserService.rsmList( { regionId : response.data.payload.u_fk_rg_id, areaId : response.data.payload.u_fk_ar_id } )
                .then(response => {
                  if ( response.data.status == true ) {
                      this.setState({
                          rsms: response.data.payload ?? ''
                      });
                  }
                })
                .catch(e => {
                  console.log(e);
                });
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { roles, state, city, tsms, asms, rsms } = this.state;
    console.log('tsms',tsms);
    console.log('asms',asms);
    return (
        <React.Fragment>
            <div class="container-fluid mt--7">
                <div class="row">
                    <div class="col">
                    <div class="card bg-secondary shadow">
                        <div class="card-header bg-white border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                            <h3 class="mb-0">Edit Staff Member</h3>
                            </div>
                            <div class="col-4 text-right">
                                <Link to={"/staff"} className="btn btn-sm btn-primary">
                                    Staff List
                                </Link>
                            </div>
                        </div>
                        </div>
                        <div class="card-body">
                          <div class='row'>
                            <div class='col-md-6'>
                              <Form method="post" className={this.state.className} noValidate validated={this.validated} onSubmit={this.handleSubmit}>
                                  <h6 class="heading-small text-muted mb-4">User information</h6>
                                  <div class="pl-lg-4">
                                      <div class="row">
                                          <div class="row col-lg-12">
                                            <div class="col-lg-6">
                                              <div class="form-group">
                                                  <label class="form-control-label" for="input-username">User Type</label>
                                                  <input type="text" class="form-control form-control-alternative" value={this.state.type} disabled></input>
                                              </div>
                                            </div>
                                            { ( this.state.type_id == 3 || this.state.type_id == 4 || this.state.type_id == 5 )  &&
                                            // <div class="col-lg-2">
                                            //   <div class="form-group" style={{ display : this.state.regionDisplay }}>
                                            //       <label class="form-control-label" for="input-username">Region</label>
                                            //       <input type="text" class="form-control form-control-alternative" value={this.state.region} disabled></input>
                                            //   </div>
                                            // </div>

                                              <div class="col-lg-6">
                                              <div class="form-group">
                                                  <label class="form-control-label" for="input-username">State</label>
                                                  <input type="text" class="form-control form-control-alternative" value={this.state.state} disabled></input>
                                              </div>
                                              </div>
                                            }
                                            { ( this.state.type_id == 3 || this.state.type_id == 4 || this.state.type_id == 5 )  &&
                                            // <div class="col-lg-2">
                                            //   <div class="form-group" style={{ display : this.state.areaDisplay }}>
                                            //       <label class="form-control-label" for="input-username">Area</label>
                                            //       <input type="text" class="form-control form-control-alternative" value={this.state.area} disabled></input>
                                            //   </div>
                                            // </div>
                                              <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-username">City</label>
                                                    <input type="text" class="form-control form-control-alternative" value={this.state.city} disabled></input>
                                                </div>
                                              </div>
                                            }
                                            { ( this.state.type_id == 4 || this.state.type_id == 5 )  &&
                                            <div class="col-lg-6">
                                              { ( this.state.rsm_name != null )
                                              ? <div class="form-group" style={{ display : this.state.rsmDisplay }}>
                                                  <label class="form-control-label" for="input-username">RSM</label>
                                                  <input type="text" class="form-control form-control-alternative" value={this.state.rsm_name} disabled ></input>
                                                </div>
                                              : <div class="form-group" style={{ display : this.state.rsmDisplay }}>
                                                  <label class="form-control-label" for="input-username">RSM</label>
                                                  <select name='rsm' onChange={this.handleChange}  class="form-control" required >
                                                      <option  selected value="">Select</option>
                                                      {rsms && rsms.map((rsms, index) => (
                                                          <option  value={rsms.u_id}>{rsms.u_name}</option>
                                                      ))}
                                                  </select>
                                                </div>
                                              }
                                            </div>
                                            }
                                            { this.state.type_id == 5 &&
                                            <div class="col-lg-6">
                                              <div class="form-group" style={{ display : this.state.asmDisplay }}>
                                                  <label class="form-control-label" for="input-username">ASM</label>
                                                  <input type="text" class="form-control form-control-alternative" value={this.state.asm_name} disabled></input>
                                              </div>
                                            </div>
                                            }
                                          </div>
                                          <div class="col-lg-6">
                                              <div class="form-group">
                                                  <label class="form-control-label" for="input-username">Name</label>
                                                  <input required type="text" name="name" value={this.state.name} class="form-control form-control-alternative" onChange={this.handleChange}/>
                                              </div>
                                          </div>
                                          <div class="col-lg-6">
                                              <div class="form-group">
                                                  <label class="form-control-label" for="input-email">Mobile</label>
                                                  <input required type="number" id="input-email" class="form-control form-control-alternative" name="mobile" onChange={this.handleChange} value={this.state.mobile}/>
                                              </div>
                                          </div>
                                          <div class="col-lg-6">
                                              <div class="form-group">
                                                <button type="submit" class="btn btn-primary my-4">Update</button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </Form>
                            </div>

                            <div class='col-md-6'>
                              <h6 class="heading-small text-muted mb-4">Staff information</h6>

                              { (this.state.type_id == 3 && asms.length > 0 ) &&
                                <div class="accordion my-3" id="accordionExample">
                                  {asms.map((asm, index) => (
                                    <div class="card">
                                      <div class="card-header" id="headingOne" id={'headingOne'+index}>
                                        <h5 class="mb-0">
                                          <button class="btn btn-link w-100 text-primary text-left" type="button" data-toggle="collapse" data-target={"#collapseOne"+index} aria-expanded={ index == 0 ? true : false} aria-controls={"collapseOne"+index}>
                                            {asm.u_name}
                                            <i class="ni ni-bold-down float-right">{asm.u_mobile}</i>
                                          </button>
                                        </h5>
                                      </div>
                                      <div id={"collapseOne"+index} class={ index == 0 ? 'collapse show' : 'collapse'} aria-labelledby={"headingOne"+index} aria-labelledby={"headingOne"+index} data-parent="#accordionExample">
                                        <div class="card-body opacity-8">
                                          {asm.tsms.length > 0 &&
                                            <ul class="list-group">
                                              {asm.tsms.map((tsm, index) => (
                                                <li class="d-flex justify-content-between align-items-center">
                                                  <label class="form-control-label" for="input-address">{tsm.u_name}</label>
                                                  <span>{tsm.u_mobile}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>  
                              }
                              
                              { (this.state.type_id == 4 && tsms.length > 0 ) &&
                                <div>
                                  {tsms.length > 0 &&
                                    <ul class="list-group">
                                      {tsms.map((tsm, index) => (
                                        <li class="d-flex justify-content-between align-items-center">
                                          <label class="form-control-label" for="input-address">{tsm.u_name}</label>
                                          <span>{tsm.u_mobile}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  }
                                </div>
                              }
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

export default AddStaff;