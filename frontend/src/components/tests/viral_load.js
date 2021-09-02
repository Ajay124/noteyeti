import React, { Component } from "react";
import TestService from "../../services/test";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import Pagination from "../layout/pagination";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {  toast } from 'react-toastify'; 
import Moment from 'react-moment';

class ViralLoad extends Component {
  constructor(props) {
    super(props);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);

    this.retrieveTests = this.retrieveTests.bind(this);

    this.state = {
        tests: [],
        per_page : 5,
        total_records : 0,
        page : 0,
        total_pages : 1,
        dnone : 'd-none',
    };
  }

  confirm = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this therapy?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                this.handleClickDelete(id);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });
  }


  handleClickDelete = (id) => {
    TestService.delete(id)
      .then(response => {
        if ( response.data.status == false ) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          let total_records = this.state.total_records-1;
          let total_pages = Math.ceil(total_records/this.state.per_page);
          let page = this.state.page;
          if ( page > total_pages-1 ) {
            page = total_pages-1;
            this.setState({
              page : total_pages-1,
            },() => {
              this.retrieveTests();
            });
          } else {
            this.retrieveTests();
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  }


  confirmApprove = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to approve this user?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                this.handleClickApprove(id);
                onClose();
              }}
            >
              Yes, Approve it!
            </button>
          </div>
        );
      }
    });
  }

  handleClickApprove = (id) => {
    let data = {
      verify : '1',
    };
    TestService.viralUpdate( id, data )
      .then(response => {
        if ( response.data.status == false ) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          // let total_records = this.state.total_records-1;
          // let total_pages = Math.ceil(total_records/this.state.per_page);
          // let page = this.state.page;
          // if ( page > total_pages-1 ) {
          //   page = total_pages-1;
          //   this.setState({
          //     page : total_pages-1,
          //   },() => {
          //     this.retrieveManagers();
          //   });
          // } else {
          //   this.retrieveManagers();
          // }
          this.retrieveTests();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.retrieveTests();
  }

  onChangefilter(e) {
    
    this.setState({
        page : 0,
    }, () => {
        this.retrieveTests();
    });
  }

  handlePaginationChange(page) {
    this.setState({
      page : page 
    },() => {
      this.retrieveTests();
    });
  }


  retrieveTests() {
    this.setState({
      dnone : '',
    });
    let data = {
        page : this.state.page,
        per_page : this.state.per_page
    };

    TestService.getAllViral(data)
      .then(response => {
        this.setState({
          tests: response.data.payload.data,
          total_records : response.data.payload.total_records,
          page : response.data.payload.page_number,
          total_pages : response.data.payload.total_pages,
          dnone : 'd-none',
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

 
  render() {
    const { tests, per_page, total_records, page, total_pages } = this.state;
    let paginationVariable = {
        per_page : per_page,
        total_records : total_records,
        page : page,
        total_pages : total_pages
    };
    
    return (
        <React.Fragment>
            <div class="container-fluid mt--7">
                <div class="row">
                    <div class="col">
                    <div class="card shadow">
                        <div class="card-header border-0">
                            {/* <h3 class="mb-0">Card tables</h3> */}
                            <div class="row align-items-center">
                                <div class="col-4">
                                    <h3 class="mb-0">Viral Load Test Requests</h3>
                                </div>
                                {/* <div class="col-4">
                                    <select onChange={this.onChangefilter} class="form-control">
                                        <option  value="">All</option>
                                        <option  value="2">ADMIN</option>
                                        <option  value="3">RSM</option>
                                        <option  value="4">ASM</option>
                                        <option  value="5">TSM</option>
                                    </select>
                                </div> */}
                                <div class="col-8 text-right">
                                    {/* <Link to={"/add-test"} className="btn btn-sm btn-primary">
                                        Add New
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                          <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">Patient</th>
                                <th scope="col">Test</th>
                                <th scope="col">Test Type</th>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colspan="4" className={this.state.dnone} style={{ 'text-align' : 'center' }} >
                                  <div className={"spinner-border "}></div>
                                </td>
                            </tr>
                            {tests && tests.map((test, index) => (
                                <tr>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                            <span class="mb-0 text-sm">{test.p_name}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                      {test.ts_title}
                                    </td>

                                    <td>
                                      {test.tst_name}
                                    </td>

                                    <td>
                                        <Moment format="YYYY-MM-DD">
                                          {test.vlt_date}
                                        </Moment>
                                    </td>

                                    
                                    <td class="text-left">
                                        <div class="dropdown">
                                          { test.vlt_status == '0'
                                            ? <a class="" href="#!" onClick={ () => this.confirmApprove(test.vlt_uuid) }><i class="fa fa-check-circle" aria-hidden="true"></i></a>
                                            : 'Approved'
                                          }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                        <Pagination paginationVariable={paginationVariable} handlePaginationChange={this.handlePaginationChange}/>
                    </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </React.Fragment>
    );
  }
}

export default ViralLoad;