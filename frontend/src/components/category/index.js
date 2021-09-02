import React, { Component } from "react";
import CategoryService from "../../services/category";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import Pagination from "../layout/pagination";
import Switch1 from "./switch";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {  toast } from 'react-toastify'; 
//import { Switch, FormControl, FormLabel, FormHelperText, FormGroup, FormControlLabel } from '@material-ui/core';



class Category extends Component {
  constructor(props) {
    super(props);
    
    this.handlePaginationChange = this.handlePaginationChange.bind(this);

    this.retrieveTherapies = this.retrieveTherapies.bind(this);

    this.state = {
        therapies: [],
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
            <p>You want to delete this Category?</p>
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


  updateStatus = (event) => {
    console.log('event.target.checked',event.target.checked);
    console.log('event',event.target.value);
    let data = {
      isactive : event.target.checked ? '1' : '0'
    };
    CategoryService.update( event.target.value, data )
        .then(response => {
            if ( response.data.status == false ) {
            toast.error(response.data.message);
            this.setState({ className : 'was-validated'  } );
            } else {
            toast.success(response.data.message);
            this.props.history.push("/categories");
            }
        })
        .catch(e => {
            console.log(e);
        });
  }

  handleClickDelete = (id) => {
    CategoryService.delete(id)
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
              this.retrieveTherapies();
            });
          } else {
            this.retrieveTherapies();
          }
          //this.props.history.push("/staff");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.retrieveTherapies();
  }

  onChangefilter(e) {
    
    this.setState({
        //staffType: e.target.value,
        page : 0,
    }, () => {
        this.retrieveTherapies();
    });
  }

  handlePaginationChange(page) {
    this.setState({
      page : page,
    },() => {
      this.retrieveTherapies();
    });
  }

  /*onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }*/

  retrieveTherapies() {
    console.log('this.state',this.state);
    this.setState({
      dnone : '',
    });
    let data = {
        //staffType : this.state.staffType,
        page : this.state.page,
        per_page : this.state.per_page
    };

    CategoryService.getAll(data)
      .then(response => {
        this.setState({
          therapies: response.data.payload.data,
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
  

  orderHandler = (e,el) => {
    let orderInput = document.querySelectorAll('.orderInput');
    orderInput.forEach((item) => {
      if ( item.id != 'orderInput'+e ) {
        item.value=item.getAttribute('oldValue');
      }
    })
    let elements = document.querySelectorAll('.saveIcon');
    elements.forEach((item) => {
      item.style.display = 'none';
    })
    document.getElementById(e).style.display='block';
  }


  updateOrder = (e) => {
    let data = {
        order : document.getElementById('orderInput'+e).value
    };
    CategoryService.update( e, data )
      .then(response => {
        if ( response.data.status == false ) {
          toast.error(response.data.message);
          this.setState({ className : 'was-validated'  } );
        } else {
          toast.success(response.data.message);
          //document.getElementsById('orderInput'+e).value
          //this.props.history.push("/therapies");
          document.getElementById(e).style.display='none';
          this.setState(
            { page : 0 },() => {
            this.retrieveTherapies();
          });
        }
    })
    .catch(e => {
        console.log(e);
    });
  }


  hideIcon = (e) => {
    document.getElementById(e).style.display='none';
    let element = document.getElementById('orderInput'+e);
    element.value=element.getAttribute('oldValue');
  }

 
  render() {
    const { therapies, per_page, total_records, page, total_pages } = this.state;
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
                                    <h3 class="mb-0">Category List</h3>
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
                                    <Link to={"/add-category"} className="btn btn-sm btn-primary">
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
                                {/* <th scope="col">Role</th>
                                <th scope="col">Order</th> */}
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colspan="4" className={this.state.dnone} style={{ 'text-align' : 'center' }} >
                                  <div className={"spinner-border "}></div>
                                </td>
                            </tr>
                            {therapies && therapies.map((therapy, index) => (
                                <tr key={therapy.cat_uuid}>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                            <span class="mb-0 text-sm">{therapy.cat_name}</span>
                                            </div>
                                        </div>
                                    </th>
                                    {/*<td class="text-left">
                                      <input class="form-control col-md-3 orderInput" oldValue={therapy.th_order} type="number" defaultValue={therapy.th_order} id={'orderInput'+therapy.th_uuid}  onChange={() => this.orderHandler(therapy.th_uuid,therapy.th_order)} ref={(input) => this.input = input} />
                                      <div id={therapy.th_uuid} className={'saveIcon'} style={{display:'none'}}>
                                        <a href="#!" onClick={() => this.updateOrder(therapy.th_uuid)}><i className="fa fa-check-circle"></i></a>
                                        <a href="#!" onClick={() => this.hideIcon(therapy.th_uuid)}><i className="fa fa-window-close "></i></a>
                                      </div>
									</td>*/}
                                    <td class="text-left">
                                        <div class="dropdown">
                                          {/*<Switch1 id={therapy.th_uuid} value={therapy.th_isactive} updateStatus={this.updateStatus} /> */}
                                          <Link to={"/add-category/"+therapy.cat_uuid} className="">
                                              <i className="fa fa-edit"></i>
                                          </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          <a class="" href="#!" onClick={ () => this.confirm(therapy.cat_uuid) }><i className="fa fa-trash"></i></a>
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

export default Category;