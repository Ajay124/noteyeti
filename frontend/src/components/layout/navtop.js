import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/users";
class Navtop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //username : ''
        };
    }

    // componentDidMount() {
    //     this.retrieveUserDetail();
    // }

    // retrieveUserDetail() {
    //     UserService.getUserDetail({type : 1})
    //       .then(response => {
    //         if ( response.data.status == true ) {
    //             console.log('response.data.payload',response.data.payload);
    //             this.setState({
    //                 username : response.data.payload.u_name,
    //             });
    //         }
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   }
  
    logout = () => {
        this.props.loggedin(false);
    };
    render() {
      return (
        <React.Fragment>
          <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
		  <div className="container-fluid">
                {/*<Link to={"/"} className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
                    Dashboard
				</Link>*/}
                <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="./"></a>
                {/* <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                    <div className="form-group mb-0">
                        <div className="input-group input-group-alternative">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-search"></i></span>
                            </div>
                            <input className="form-control" placeholder="Search" type="text"/>
                        </div>
                    </div>
                </form> */}
                <ul className="navbar-nav align-items-center d-none d-md-flex">
                <li className="nav-item dropdown">
                    <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="media align-items-center">
                        <span className="avatar avatar-sm rounded-circle">
                            <img alt="Image placeholder" src={'./demo.png'}/>
                        </span>
                        {/* <div className="media-body ml-2 d-none d-lg-block">
                            <span className="mb-0 text-sm  font-weight-bold">{this.state.username}</span>
                        </div> */}
                    </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                        <div className=" dropdown-header noti-title">
                            <h6 className="text-overflow m-0">Welcome!</h6>
                        </div>
                        {/* <Link to={"/profile"} className="dropdown-item">
                            <i className="ni ni-single-02"></i> My profile
                        </Link> */}
                        {/* <a href="./examples/profile.html" className="dropdown-item">
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
                        </a> */}
                        <div className="dropdown-divider"></div>
                        <a href="#!" onClick={this.logout} className="dropdown-item">
                            <i className="ni ni-user-run"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </li>
                </ul>
            </div>
        </nav>
        </React.Fragment>
      );
    }
  }
  
  export default Navtop;