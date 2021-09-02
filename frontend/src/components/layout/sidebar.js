import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './assets/img/brand/logo.png';
class Sidebar extends Component {
    constructor(props) {
        super(props);
    }
   
    render() {
      return (
        <React.Fragment>
          {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
            Home
            </a>
            <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                Users
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/users/add"} className="nav-link">
                Add
                </Link>
            </li>
            </div>
        </nav> */}
        <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
            <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link to={"/"} className="navbar-brand pt-0">
                <img src={logo} className="navbar-brand-img" alt="..."/>
            </Link>
            <ul className="nav align-items-center d-md-none">
                {/* <li className="nav-item dropdown">
                    <a className="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="ni ni-bell-55"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right" aria-labelledby="navbar-default_dropdown_1">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </li> */}
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="media align-items-center">
                        <span className="avatar avatar-sm rounded-circle">
                            {/* <img alt="Image placeholder" src="./assets/img/theme/team-1-800x800.jpg"/> */}
                            <img alt="Image placeholder" src={'./demo.png'}/>
                        </span>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                        <div className=" dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                        </div>
                        <a href="./examples/profile.html" className="dropdown-item">
                        <i className="ni ni-single-02"></i>
                        <span>My profile</span>
                        </a>
                        <a href="./examples/profile.html" className="dropdown-item">
                        <i className="ni ni-settings-gear-65"></i>
                        <span>Settings</span>
                        </a>
                        <a href="./examples/profile.html" className="dropdown-item">
                        <i className="ni ni-calendar-grid-58"></i>
                        <span>Activity</span>
                        </a>
                        <a href="./examples/profile.html" className="dropdown-item">
                        <i className="ni ni-support-16"></i>
                        <span>Support</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#!" className="dropdown-item">
                        <i className="ni ni-user-run"></i>
                        <span>Logout</span>
                        </a>
                    </div>
                </li>
            </ul>
            <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                <div className="navbar-collapse-header d-md-none">
                <div className="row">
                    <div className="col-6 collapse-brand">
                    {/* <a href="./index.html">
                        <img src="./assets/img/brand/blue.png"/>
                    </a> */}
                    <Link to={"/"}>
                        <img src={logo} className="navbar-brand-img" alt="..."/>
                    </Link>
                    </div>
                    <div className="col-6 collapse-close">
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
                </div>
                {/* <form className="mt-4 mb-3 d-md-none">
                    <div className="input-group input-group-rounded input-group-merge">
                        <input type="search" className="form-control form-control-rounded form-control-prepended" placeholder="Search" aria-label="Search"/>
                        <div className="input-group-prepend">
                        <div className="input-group-text">
                            <span className="fa fa-search"></span>
                        </div>
                        </div>
                    </div>
                </form> */}
                <ul className="navbar-nav">
                    <li className="nav-item  active ">
                        <Link to={"/"} className="nav-link  active ">
                            <i className="ni ni-tv-2 text-primary"></i> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/users"} className="nav-link">
                        <i className="ni ni-single-02 text-yellow"></i> Users
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link to={"/categories"} className="nav-link">
                        <i className="fa fa-medkit"></i> Categories
                        </Link>
                    </li> */}
                    {/*<li className="nav-item">
                        <Link to={"/test-list"} className="nav-link">
                        <i className="fa fa-vial"></i> Test List
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/do-dont"} className="nav-link">
                        <i className="fa fa-prescription"></i> Do's & Dont's
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/diet-exercise"} className="nav-link">
                        <i className="fa fa-plus"></i> Diet & Exercise
                        </Link>
					</li> 

                    

                    <li className="nav-item">
                        <Link to={"/patients"} className="nav-link">
                        <i class="fa fa-wheelchair"></i> Patients
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/viral-load-test"} className="nav-link">
                        <i class="fa fa-syringe"></i> Viral Load Test
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/purchase-request"} className="nav-link">
                        <i class="fa fa-shopping-cart"></i> Purchase Request
                        </Link>
                    </li>*/}
                </ul>
            </div>
            </div>
        </nav>
        </React.Fragment>
      );
    }
  }
  
  export default Sidebar;