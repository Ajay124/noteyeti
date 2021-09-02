import React, { Component } from "react";
import TestService from "../../services/test";
import Modal from "./modal";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import { Form, Button, Col, InputGroup } from "react-bootstrap";

import {  toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css'; 

//import Modal from "react-bootstrap-modal";


class Add extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.typehandleSubmit = this.typehandleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.openModal = this.openModal.bind(this);

    this.state = {
      id : this.props.match.params.id,
      id1 : '',
      title : '',
      testtypes : [],
      className : '',
      className1 : '',
      typetitle : '',
      modalVisible: ''
    };
  }

  updateModel = (id, title) => {
    this.setState({ id1 : id, typetitle : title, modalVisible: 'show' });
  }

  handleChange(event) {
    let inputName = event.target.name;
    this.setState({ [inputName] : event.target.value });
  }


  componentDidMount() {
    if ( this.state.id ) {
        this.retrieveTestDetail();
    }
  }


  retrieveTestDetail() {
    TestService.get(this.state.id)
      .then(response => {
        if ( response.data.status == true ) {
          console.log(response.data.payload);
            this.setState({
                title : response.data.payload.ts_title,
                testtypes : response.data.payload.types,
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
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
        title : this.state.title,
      };

      if ( this.state.id ) {
        TestService.update( this.state.id, data )
        .then(response => {
            if ( response.data.status == false ) {
            toast.error(response.data.message);
            this.setState({ className : 'was-validated'  } );
            } else {
            toast.success(response.data.message);
            this.props.history.push("/test-list");
            }
        })
        .catch(e => {
            console.log(e);
        });
      } else {
        TestService.create(data)
        .then(response => {
            if ( response.data.status == false ) {
            toast.error(response.data.message);
            this.setState({ className : 'was-validated'  } );
            } else {
            toast.success(response.data.message);
            this.props.history.push("/test-list");
            }
        })
        .catch(e => {
            console.log(e);
        }); 
      }
      
    }
    
  }

  typehandleSubmit (event) {
    this.setState({ className1 : ''} );
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({ className1 : 'was-validated' } );
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      let data = {
        title : this.state.typetitle,
      };

      if ( this.state.id1 ) {
        TestService.typeUpdate( this.state.id1, data )
        .then(response => {
            if ( response.data.status == false ) {
            toast.error(response.data.message);
            this.setState({ className1 : 'was-validated'  } );
            } else {
              document.getElementsByTagName('body')[0].className='';
              document.getElementById('exampleModal').removeAttribute("role");
              document.getElementById('exampleModal').style.display="none";
              this.setState({ modalVisible: 'modalVisible'});
              let backdrop = document.querySelector('.modal-backdrop')
              document.body.removeChild(backdrop);
              toast.success(response.data.message);
              //this.props.history.push("/add-test/"+this.state.id);
              this.retrieveTestDetail();
              this.setState({ modalVisible: ''});
            }
        })
        .catch(e => {
            console.log(e);
        });
      } else {
        data.id = this.state.id;
        TestService.typeCreate(data)
        .then(response => {
            if ( response.data.status == false ) {
            toast.error(response.data.message);
            this.setState({ className1 : 'was-validated'  } );
            } else {
              document.getElementsByTagName('body')[0].className=''
              this.setState({typetitle : '', modalVisible: 'modalVisible'});
              let backdrop = document.querySelector('.modal-backdrop');
              document.body.removeChild(backdrop);
              toast.success(response.data.message);
              //this.props.history.push("/add-test/"+this.state.id);
              this.retrieveTestDetail()
            }
        })
        .catch(e => {
            console.log(e);
        }); 
      }
      
    }
    
  }

 
 
  render() {
    const  { id,testtypes } = this.state;
    let h3 = 'Add New Test';
    let buttonTXT = 'Add';
    if ( id != undefined ) {
        h3 = 'Update Test';
        buttonTXT = 'Update';
    }
    return (
        <React.Fragment>
            <div class="container-fluid mt--7">
                <div class="row">
                    <div class="col">
                    <div class="card bg-secondary shadow">
                        <div class="card-header bg-white border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h3 class="mb-0">{h3}</h3>
                            </div>
                            <div class="col-4 text-right">
                                <Link to={"/test-list"} className="btn btn-sm btn-primary">
                                    Test List
                                </Link>
                            </div>
                        </div>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div className="col-lg-4">
                              <Form method="post" className={this.state.className} noValidate validated={this.validated} onSubmit={this.handleSubmit}>
                                  <div class="pl-lg-4">
                                      <div class="row">
                                          <div class="col-lg-12">
                                              <div class="form-group">
                                                  <label class="form-control-label" for="title">Title</label>
                                                  <input required type="text" name="title" value={this.state.title} class="form-control form-control-alternative" onChange={this.handleChange}/>
                                              </div>
                                          </div>

                                          <div class="col-lg-12">
                                              <div class="form-group">
                                                  <button type="submit" class="btn btn-primary my-4">{buttonTXT}</button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </Form>
                            </div>
                            {id && 
                            <div className="col-lg-8">
                              <div class="row">
                                <div class="col">
                                  <div class="card shadow">
                                      <div class="card-header border-0">
                                          {/* <h3 class="mb-0">Card tables</h3> */}
                                          <div class="row align-items-center">
                                              <div class="col-4">
                                                  <h3 class="mb-0">Test Types</h3>
                                              </div>
                                              <div class="col-8 text-right">
                                                  {/* <Link to={"/add-test"} className="btn btn-sm btn-primary">
                                                      Add New Type
                                                  </Link> */}
                                                  <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={ () => this.updateModel('','') } >Add New Type</button>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="table-responsive">
                                        <table class="table align-items-center table-flush">
                                          <thead class="thead-light">
                                          <tr>
                                              <th scope="col">Title</th>
                                              <th scope="col">Action</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {testtypes && testtypes.map((tt, index) => (
                                            <tr>
                                                <th scope="row">
                                                    <div class="media align-items-center">
                                                        <div class="media-body">
                                                        <span class="mb-0 text-sm">{tt.tst_name}</span>
                                                        </div>
                                                    </div>
                                                </th>
                                                
                                                <td class="text-left">
                                                    <div class="dropdown">
                                                        <a class="" href="#!" data-toggle="modal" data-target="#exampleModal" onClick={ () => this.updateModel(tt.tst_uuid,tt.tst_name) }><i className="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <a class="" href="#!" onClick={ () => this.confirm() }><i className="fa fa-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                          ))}
                                          </tbody>
                                        </table>
                                      </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            } 
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
                <Footer></Footer>
                </div>
                <div className={"modal fade "+this.state.modalVisible} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Test Type</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <Form method="post" className={this.state.className} noValidate validated={this.validated} onSubmit={this.typehandleSubmit}>
                      <div class="modal-body">
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="form-control-label" for="typetitle">Title</label>
                                        <input required type="text" name="typetitle" value={this.state.typetitle} class="form-control form-control-alternative" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                      </div>
                    </Form>
                    </div>
                  </div>
                </div>
        </React.Fragment>
    );
  }
}

export default Add;