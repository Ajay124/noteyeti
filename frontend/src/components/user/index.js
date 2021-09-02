import React, { Component } from "react";
import UserService from "../../services/users";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import Pagination from "../layout/pagination";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {  toast } from 'react-toastify'; 
import Moment from 'react-moment';

class Users extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangefilter = this.onChangefilter.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);

    this.retrieveUsers = this.retrieveUsers.bind(this);

    this.state = {
        users: [],
        //staffType: '',
        searchTitle: '',
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


  handleClickDelete = (id) => {
    UserService.delete(id)
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
              this.retrieveUsers();
            });
          } else {
            this.retrieveUsers();
          }
          //this.props.history.push("/staff");
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
    UserService.update( id, data )
      .then(response => {
        if ( response.data.status == false ) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          this.retrieveUsers();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangefilter(e) {
    /*this.setState({
        staffType: e.target.value
    });
    this.retrieveUsers();*/
    this.setState({
        staffType: e.target.value,
        page : 0,
    }, () => {
        this.retrieveUsers();
    });
  }

  handlePaginationChange(page) {
    this.setState({
      page : page 
    },() => {
      this.retrieveUsers();
    });
  }

  onChangeSearchTitle(e) {
    this.setState({
      searchTitle: e.target.value,
      page : 0
    },()=>{
      this.retrieveUsers();
    });
  }

  retrieveUsers() {
    this.setState({
      dnone : '',
    });
    let data = {
        //staffType : this.state.staffType,
        searchTitle : this.state.searchTitle,
        page : this.state.page,
        per_page : this.state.per_page
    };

    UserService.getAll(data)
      .then(response => {
        this.setState({
          users: response.data.payload.data,
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
    const { users, per_page, total_records, page, total_pages } = this.state;
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
                                <div class="col-7">
                                    <h3 class="mb-0">User List</h3>
                                </div>
                                {/* <div class="col-3">
                                    <select onChange={this.onChangefilter} class="form-control">
                                        <option  value="">All</option>
                                        <option  value="2">ADMIN</option>
                                        <option  value="3">RSM</option>
                                        <option  value="4">ASM</option>
                                        <option  value="5">TSM</option>
                                    </select>
                                </div> */}
                                <div class="col-5">
                                    <input class="form-control" onChange={this.onChangeSearchTitle} type="text" placeholder="Search by username/email/mobile"></input>
                                </div>
                                {/* <div class="col-2 text-right">
                                    <Link to={"/add-staff"} className="btn btn-sm btn-primary">
                                        Add New
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                        <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile</th>
                                {/* <th scope="col">Votes</th>
                                <th scope="col">Rank</th> */}
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colspan="4" className={this.state.dnone} style={{ 'text-align' : 'center' }} >
                                  <div className={"spinner-border "}></div>
                                </td>
                            </tr>
                            {users && users.map((user, index) => (
                                <tr>
                                    <td>
                                        {/* <img style={{"max-height": "50px","border-radius":"100%"}} src={user.u_image} alt="no image" /> */}
                                    </td>
                                    <td>
                                      {user.u_username}
                                    </td>
                                    <td>
                                      {user.u_email}
                                    </td>
                                    <td>
                                        {user.u_mobile}
                                        {/* <Moment format="YYYY-MM-DD">
                                          {user.u_mobile}
                                        </Moment> */}
                                    </td>
                                    {/* <td class="text-left">
                                        {user.liker.length}
                                    </td>
                                    <td class="text-left">
                                        {user.rank}
                                    </td> */}
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

export default Users;