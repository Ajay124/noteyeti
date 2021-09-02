import React, { Component } from "react";
import * as Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/js/plugins/nucleo/css/nucleo.css';
import './assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';

//import './assets/scss/argon-dashboard.scss';
import './assets/css/argon-dashboard.css';
import './assets/css/custom.css';
import { Link, Switch, Route } from "react-router-dom";
import LoginHeaderbg from "./loginheaderbg";
import verifyEmail from "./email_verification";
import LoginIndex from "./loginindex";
import UserService from "../../services/users";
import Headerbg from "./headerbg";
import Navtop from "./navtop";
import Dashboard from "./dashboard";
import Sidebar from "./sidebar";

import Users from "../user";
import AddStaff from "../user/add_staff";
import EditStaff from "../user/edit_staff";

import Profile from "../user/profile";

import Categories from "../category/";
import addCategory from "../category/add";

//import testList from "../tests/";
//import addTest from "../tests/add";

//import dodontList from "../dodont/";
//import addDodont from "../dodont/add";

//import dietexercisetList from "../dietexercise";
//import addDietexercise from "../dietexercise/add";

//import Patients from "../user/patients";
//import PatientDetail from "../user/patient_detail";

//import FieldManagers from "../user/field_managers";

//import ViralLoadTest from "../tests/viral_load";

//import PurchaseRequest from "../purchases/index";

import { ToastContainer, toast } from 'react-toastify';
class Index extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isUserLoggedIn : false
      }
    }

    componentDidMount() {
      const sessionCookie = Cookies.get("session");
      if ( sessionCookie && sessionCookie != '' ) {
        UserService.loginStatus(sessionCookie)
        .then(response => {
          if ( response.data.status == false ) {
            this.setState({ className : 'was-validated', errors : response.data.message  } );
          } else {
            this.props.loggedin();
          }
        })
        .catch(e => {
          console.log(e);
        });
        this.setState( { isUserLoggedIn : true } );
      }
    }


    loggedin = ( status = true ) => {
      if ( status == false ) {
        this.setState( { isUserLoggedIn : false } );
        Cookies.remove("session");
      } else {
        this.setState( { isUserLoggedIn : true } );
      }
    };
    render() {
      if ( this.state.isUserLoggedIn == true ) {
        return (
          <React.Fragment>
            <ToastContainer />
            <Sidebar></Sidebar>
            <div className="main-content">
              {/* <Header loggedin={this.loggedin}></Header> */}
              <Navtop loggedin={this.loggedin}></Navtop>
              <Headerbg></Headerbg>
              {/* <Index></Index> */}
              <Switch>
                <Route exact path={["/"]} component={Dashboard} />
				
                <Route exact path={["/users"]} component={Users} />
        {/*        <Route exact path={["/add-staff"]} component={AddStaff} />
                <Route exact path={["/edit-staff/:id"]} component={EditStaff} />
				*/}
                <Route exact path={["/profile"]} component={Profile} />

                <Route exact path={["/add-category"]} component={addCategory} />
                <Route exact path={["/add-category/:id"]} component={addCategory} />
                <Route exact path={["/categories"]} component={Categories} />
				
				{/*
                <Route exact path={["/add-test"]} component={addTest} />
                <Route exact path={["/add-test/:id"]} component={addTest} />
                <Route exact path={["/test-list"]} component={testList} />

                <Route exact path={["/do-dont"]} component={dodontList} />
                <Route exact path={["/add-dodont"]} component={addDodont} />
                <Route exact path={["/add-dodont/:id"]} component={addDodont} />
                
                <Route exact path={["/diet-exercise"]} component={dietexercisetList} />
                <Route exact path={["/add-diet-exercise"]} component={addDietexercise} />
                <Route exact path={["/add-diet-exercise/:id"]} component={addDietexercise} />

                <Route exact path={["/patients"]} component={Patients} />
                <Route exact path={["/patients/:id"]} component={PatientDetail} />
                
                <Route exact path={["/field-managers"]} component={FieldManagers} />

                <Route exact path={["/viral-load-test"]} component={ViralLoadTest} />

                <Route exact path={["/purchase-request"]} component={PurchaseRequest} />
				*/}
				<Route exact path="/email-verify/:id" component={verifyEmail} />

                

              </Switch>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div className="main-content">
            {/* <LoginHeader></LoginHeader> */}
              {/* <Switch>
                <Route exact path={["/", "/users"]} component={UserList} />
                <Route exact path="/users/add" component={AddUser} />
                <Route path="/users/:id" component={User} />
              </Switch> */}
              <LoginHeaderbg></LoginHeaderbg>
			  <Switch>
                {/* <Route exact path={["/", "/users"]} component={UserList} />*/}
                <Route exact path="/email-verify/:id" component={verifyEmail} />
                <Route path="/" component={() => (<LoginIndex loggedin={this.loggedin} />)} /> 
              </Switch>
              {/*<LoginIndex loggedin={this.loggedin}></LoginIndex>*/}
            </div>
          </React.Fragment>
        );
      }
      
    }
  }
  
  export default Index;