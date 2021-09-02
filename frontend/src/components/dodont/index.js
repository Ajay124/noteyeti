import React, { Component } from "react";
import TestService from "../../services/test";
import DosdontsService from "../../services/dosdonts";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import Pagination from "../layout/pagination";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {  toast } from 'react-toastify'; 

class Test extends Component {
  constructor(props) {
    super(props);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);

    this.retrieveDosdonts = this.retrieveDosdonts.bind(this);

    this.state = {
        dosdonts: [],
        per_page : 5,
        total_records : 0,
        page : 0,
        total_pages : 1,
        dnone : 'd-none',
        content : '',
    };
  }

  confirm = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this Dos/Donts?</p>
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

  openModel = (content) => {
    this.setState({content : content});
  };
  handleClickDelete = (id) => {
    DosdontsService.delete(id)
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
              this.retrieveDosdonts();
            });
          } else {
            this.retrieveDosdonts();
          }
          //this.props.history.push("/staff");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.retrieveDosdonts();
  }

  onChangefilter(e) {
    
    this.setState({
        //staffType: e.target.value,
        page : 0,
    }, () => {
        this.retrieveDosdonts();
    });
  }

  handlePaginationChange(page) {
    this.setState({
      page : page 
    },() => {
      this.retrieveDosdonts();
    });
  }


  retrieveDosdonts() {
    this.setState({
      dnone : '',
    });
    let data = {
        //staffType : this.state.staffType,
        page : this.state.page,
        per_page : this.state.per_page
    };

    DosdontsService.getAll(data)
      .then(response => {
        this.setState({
          dosdonts: response.data.payload.data,
          total_records : response.data.payload.total_records,
          page : response.data.payload.page_number,
          total_pages : response.data.payload.total_pages,
          dnone : 'd-none',
        });
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

 
  render() {
    const { dosdonts, per_page, total_records, page, total_pages } = this.state;
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
                                    <h3 class="mb-0">Do's & Dont's List</h3>
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
                                    <Link to={"/add-dodont"} className="btn btn-sm btn-primary">
                                        Add New
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                          <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Type</th>
                                {/* <th scope="col">Therapy</th> */}
                                {/* <th scope="col">Role</th>
                                <th scope="col">Mobile</th> */}
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colspan="4" className={this.state.dnone} style={{ 'text-align' : 'center' }} >
                                  <div className={"spinner-border "}></div>
                                </td>
                            </tr>
                            {dosdonts && dosdonts.map((test, index) => (
                                <tr>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                            <span class="mb-0 text-sm">{test.dd_title}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                            <span class="mb-0 text-sm">{test.dd_type == 1 ? "Do's" : "Dont's" }</span>
                                            </div>
                                        </div>
                                    </th>
                                    {/* <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                            <span class="mb-0 text-sm">{test.th_title}</span>
                                            </div>
                                        </div>
                                    </th> */}
                                    {/* <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                            <div dangerouslySetInnerHTML={{__html: test.dd_content}}></div> 
                                            <span class="mb-0 text-sm">{test.dd_content}</span>
                                            </div>
                                        </div>
                                    </th> */}
                                    <td class="text-left">
                                        <div class="dropdown">
                                            <a class="" href="#!" data-toggle="modal" data-target="#exampleModal" onClick={ () => this.openModel(test.dd_content) }><i className="fa fa-eye"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Link to={"/add-dodont/"+test.dd_uuid} className="">
                                                <i className="fa fa-edit"></i>
                                            </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a class="" href="#!" onClick={ () => this.confirm(test.dd_uuid) }><i className="fa fa-trash"></i></a>
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
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  <div dangerouslySetInnerHTML={{__html: this.state.content}}></div> 
                  </div>
                </div>
              </div>
            </div>
        </React.Fragment>
    );
  }
}

export default Test;