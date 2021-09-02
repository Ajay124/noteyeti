import React, { Component } from "react";
import UsersService from "../../services/users";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import Pagination from "../layout/pagination";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {  toast } from 'react-toastify'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

class Managers extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.searchByDate = this.searchByDate.bind(this);
    this.onChangefilter = this.onChangefilter.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);

    this.retrieveManagers = this.retrieveManagers.bind(this);

    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveTutorial = this.setActiveTutorial.bind(this);
    // this.removeAllTutorials = this.removeAllTutorials.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);

    this.state = {
        managers: [],
        searchTitle: '',
        per_page : 5,
        total_records : 0,
        page : 0,
        total_pages : 1,
        dnone : 'd-none',
        status : ''
    };
  }

  confirm = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this user?</p>
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
    UsersService.update( id, data )
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
          this.retrieveManagers();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }


  handleClickDelete = (id) => {
    UsersService.delete(id)
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
              this.retrieveManagers();
            });
          } else {
            this.retrieveManagers();
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.retrieveManagers();
  }

  onChangefilter(e) {
    this.setState({
        page : 0,
        status : e.target.value
    }, () => {
        this.retrieveManagers();
    });
  }

  handlePaginationChange(page) {
    this.setState({
      page : page 
    },() => {
      this.retrieveManagers();
    });
  }

  onChangeSearchTitle(e) {
    this.setState({
      searchTitle: e.target.value,
      page : 0
    },()=>{
      this.retrieveManagers();
    });
  }

  retrieveManagers() {
    this.setState({
      dnone : '',
    });
    let data = {
        page : this.state.page,
        per_page : this.state.per_page,
        searchTitle : this.state.searchTitle,
        status : this.state.status
    };

    UsersService.getManagers(data)
      .then(response => {
        this.setState({
          managers: response.data.payload.data,
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

  searchByDate(e) {
    let formattedDate ='';
    if( e != null ) {
      let selectedDate = new Date(e);
      formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`;
    }
    console.log(e);
    this.setState({
      searchDate: e,
      date : formattedDate,
      page : 0
    },()=>{
      this.retrievePatients();
    });
  }

  render() {
    const { managers, per_page, total_records, page, total_pages } = this.state;
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
                                    <h3 class="mb-0">Manager List</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <select onChange={this.onChangefilter} class="form-control">
                                        <option  value="">All</option>
                                        <option  value="1">Verified</option>
                                        <option  value="2">Not Verified </option>
                                    </select>
                                </div>
                                <div class="col-4 text-right">
                                    <input class="form-control" onChange={this.onChangeSearchTitle} type="text" placeholder="Search by name"></input>
                                    {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
                                    {/* <DatePicker 
                                      className="form-control"
                                      selected={this.state.searchDate} 
                                      onChange={this.searchByDate} 
                                      placeholderText="Search by date"
                                      //value={this.date}
                                      dateFormat="yyyy-MM-dd"
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">State</th>
                                <th scope="col">City</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colspan="4" className={this.state.dnone} style={{ 'text-align' : 'center' }} >
                                  <div className={"spinner-border "}></div>
                                </td>
                            </tr>
                            {managers && managers.map((manager, index) => (
                                <tr>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                            <span class="mb-0 text-sm">{manager.u_name}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        {manager.u_mobile}
                                    </td>
                                    <td>
                                        {manager.state_name}
                                    </td>
                                    <td>
                                        {manager.city_name}
                                    </td>
                                    <td>
                                        { manager.u_isverified == '1'
                                         ? 'Verified'
                                         : 'Not Verified'
                                        }
                                    </td>
                                    <td class="text-left">
                                        { manager.u_isdeleted == '1'
                                            ? 'Deleted'
                                            : 
                                            <div class="dropdown">
                                                { manager.u_isverified == '1'
                                                ? <i class="fa fa-shield"></i>
                                                : <a class="" href="#!" onClick={ () => this.confirmApprove(manager.u_uuid) }><i class="fa fa-check-circle" aria-hidden="true"></i></a>
                                                }
                                                
                                                {/* <Link to={"/patients/"+manager.p_uuid} className="">
                                                    <i className="fa fa-eye"></i>
                                                </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a class="" href="#!" onClick={ () => this.confirm(manager.u_uuid) }><i className="fa fa-trash"></i></a>
                                            </div>
                                        }
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

export default Managers;