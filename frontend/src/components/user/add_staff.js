import React, { Component } from "react";
import UserService from "../../services/users";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
import {  toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';    

class AddStaff extends Component {
  constructor(props) {
    super(props);

    this.retrieveUserTypes = this.retrieveUserTypes.bind(this);

    this.region = this.region.bind(this);
    this.area = this.area.bind(this);

    // this.states = this.states.bind(this);
    // this.cities = this.cities.bind(this);

    this.loadRegion = this.loadRegion.bind(this);
    this.loadAreas = this.loadAreas.bind(this);

    // this.loadStates = this.loadStates.bind(this);
    // this.loadCities = this.loadCities.bind(this);

    this.loadType = this.loadType.bind(this);

    this.rsmList = this.rsmList.bind(this);
    this.asmList = this.asmList.bind(this);

    this.loadRSM = this.loadRSM.bind(this);
    this.loadASM = this.loadASM.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);


    this.state = {
      roles: [],

      region: [],
      area: [],

      // states: [],
      // cities: [],

      rsms: [],
      asms: [],

      regionDisplay : 'none',
      areaDisplay : 'none',

      // stateDisplay : 'none',
      // cityDisplay : 'none',

      rsmDisplay : 'none',
      asmDisplay : 'none',

      type : '',

      regionId : '',
      areaId : '',
      // stateId : '',
      // cityId : '',

      rsmId : '',
      asmId : '',

      regionRequired : false,
      areaRequired : false,

      // stateRequired : false,
      // cityRequired : false,
      
      rsmRequired : false,
      asmRequired : false,

      name : '',
      mobile : '',

      className : '',
      dnone : 'd-none',

      /*currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""*/

    };
  }

  handleChange(event) {
    let inputName = event.target.name;
    this.setState({ [inputName] : event.target.value });
  }



  handleSubmit (event) {
    console.log('handleSubmit',this.state);
    this.setState({ className : '', errors : ''  } );
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('validiey false');
      this.setState({ className : 'was-validated' } );
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log('validiey false else');
      event.preventDefault();
      event.stopPropagation();
      let data = {
        mobile : this.state.mobile,
        name : this.state.name,
        type : this.state.type,
        // stateId : this.state.stateId,
        // cityId : this.state.cityId,
        regionId : this.state.regionId,
        areaId : this.state.areaId,
        rsmId : this.state.rsmId,
        asmId : this.state.asmId,
      };

      UserService.create(data)
      .then(response => {
        if ( response.data.status == false ) {
          toast.error(response.data.message);
          this.setState({ className : 'was-validated'  } );
        } else {
          toast.success(response.data.message);
          this.props.history.push("/staff");
        }
      })
      .catch(e => {
        console.log(e);
      });
    }
    
  }

  componentDidMount() {
    this.retrieveUserTypes();
  }

 async loadRegion(e) {
    this.setState({
      region: [],
      area: [],
      rsms: [],
      asms: [],
      regionDisplay: 'none',
      areaDisplay: 'none',
      rsmDisplay: 'none',
      asmDisplay: 'none',
      regionRequired : false,
      areaRequired : false,
      rsmRequired : false,
      asmRequired : false,
    });
    if( e.target.value != '' ) {
      if( e.target.value != 2 ) {
        this.setState({dnone : ''});
        await this.region();
        this.setState({
          regionDisplay: 'block',
          regionRequired : true,
          areaRequired : false,
          rsmRequired : false,
          asmRequired : false,
          areaDisplay: 'none',
          rsmDisplay: 'none',
          asmDisplay: 'none',
          type : e.target.value,
          regionId : '',
          areaId : '',
          rsmId : '',
          asmId : '',
          dnone : 'd-none',
        });
      } else {
        this.setState({
          regionRequired : false,
          areaRequired : false,
          rsmRequired : false,
          asmRequired : false,
          regionDisplay: 'none',
          areaDisplay: 'none',
          rsmDisplay: 'none',
          asmDisplay: 'none',
          type : e.target.value,
          regionId : '',
          areaId : '',
          rsmId : '',
          asmId : '',
        });
      }
    }
  }


  /*async loadStates(e) {
    this.setState({
      states: [],
      cities: [],
      rsms: [],
      asms: [],
      stateDisplay: 'none',
      cityDisplay: 'none',
      rsmDisplay: 'none',
      asmDisplay: 'none',
      stateRequired : false,
      cityRequired : false,
      rsmRequired : false,
      asmRequired : false,
    });
    if( e.target.value != '' ) {
      if( e.target.value != 2 ) {
        this.setState({dnone : ''});
        await this.states();
        this.setState({
          stateDisplay: 'block',
          stateRequired : true,
          cityRequired : true,
          cityRequired : false,
          rsmRequired : false,
          asmRequired : false,
          cityDisplay: 'none',
          rsmDisplay: 'none',
          asmDisplay: 'none',
          type : e.target.value,
          stateId : '',
          cityId : '',
          rsmId : '',
          asmId : '',
          dnone : 'd-none',
        });
      } else {
        this.setState({
          stateRequired : false,
          cityRequired : false,
          rsmRequired : false,
          asmRequired : false,
          stateDisplay: 'none',
          cityDisplay: 'none',
          rsmDisplay: 'none',
          asmDisplay: 'none',
          type : e.target.value,
          stateId : '',
          cityId : '',
          rsmId : '',
          asmId : '',
        });
      }
    }
  }*/

  async loadAreas(e) {
    console.log('asdfasdfa',e);
    if ( e.target.value != '' ) {
      this.setState({
        area: [],
        rsms: [],
        asms: [],
        areaDisplay: 'none',
        areaRequired : false,
        dnone : '',
      });
     await this.area(e.target.value);
      this.setState({
        areaDisplay: 'block',
        rsmDisplay: 'none',
        asmDisplay: 'none',
        areaRequired : true,
        rsmRequired : false,
        asmRequired : false,
        regionId : e.target.value,
        dnone : 'd-none'
      });
    }
    
  }


  /*async loadCities(e) {
    if ( e.target.value != '' ) {
      this.setState({
        cities: [],
        rsms: [],
        asms: [],
        cityDisplay: 'none',
        cityRequired : false,
        dnone : '',
      });
     await this.cities(e.target.value);
      this.setState({
        cityDisplay: 'block',
        rsmDisplay: 'none',
        asmDisplay: 'none',
        cityRequired : true,
        rsmRequired : false,
        asmRequired : false,
        stateId : e.target.value,
        dnone : 'd-none'
      });
    }
    
  }*/


  async loadRSM(e) {
    if ( e.target.value != '' ) {
      this.setState({
        rsms: [],
        asms: [],
        rsmDisplay: 'none',
        rsmRequired : false,
        asmDisplay: 'none',
        asmRequired : false,
      });
      if ( this.state.type != 3 ) {
        this.setState({dnone : ''});
        await this.rsmList(this.state.regionId, e.target.value);
        this.setState({
          rsmDisplay: 'block',
          asmDisplay: 'none',
          rsmRequired : true,
          asmRequired : false,
          rsmId : '',
          asmId : '',
          areaId : e.target.value,
          dnone : 'd-none'
        });
      } else {
        this.setState({
          areaId : e.target.value,
        });
      }
    }
    
  }


  async loadASM(e) {
    if ( e.target.value != '' ) {
      this.setState({
        asms: [],
        asmDisplay: 'none',
        asmRequired : false,
      });
        if ( this.state.type != 4 ) {
          this.setState({dnone : ''});
          await this.asmList(this.state.regionId, this.state.areaId);
          this.setState({
            asmDisplay: 'block',
            asmRequired : true,
            rsmId : e.target.value,
            asmId : '',
            dnone : 'd-none',
          });
        } else {
          this.setState({
            rsmId : e.target.value,
          });
        }
    }
  }

  loadType(e) {
    if ( e.target.value != '' ) {
      if ( this.state.type == 5 ) {
          this.setState({
            asmDisplay: 'block',
            asmRequired: true,
            asmId : e.target.value,
          });
          if ( this.state.areaId != '' ) {
            this.setState({
              rmsId : e.target.value
            });
          } else {
            this.setState({
              rsmDisplay: 'block',
              rsmRequired: true,
              areaId : e.target.value
            });
            this.rsmList(this.state.regionId, e.target.value);
          }
      } else {
        this.setState({
          rsmId : e.target.value,
        });
      }
    }
  }


  retrieveUserTypes() {
    UserService.getUserTypes()
      .then(response => {
          console.log('retrieveUserTypes',response.data);
        if ( response.data.status == true ) {
            this.setState({
                roles: response.data.payload
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  async region() {
    await UserService.region()
      .then(response => {
        if ( response.data.status == true ) {
            this.setState({
                region: response.data.payload
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  /*async states() {
    await UserService.states()
      .then(response => {
        if ( response.data.status == true ) {
            this.setState({
                states: response.data.payload
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }*/

  async area(id) {
    await UserService.area( { id : id } )
      .then(response => {
        if ( response.data.status == true ) {
            this.setState({
                area: response.data.payload
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  /*async cities(id) {
    await UserService.cities( { id : id } )
      .then(response => {
        if ( response.data.status == true ) {
            this.setState({
                cities: response.data.payload
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }*/


  async rsmList(regionId,areaId) {
    await UserService.rsmList( { regionId : regionId, areaId : areaId, } )
      .then(response => {
        if ( response.data.status == true ) {
            this.setState({
                rsms: response.data.payload
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }


  async asmList(regionId,areaId) {
    await UserService.asmList( { regionId : regionId, areaId : areaId, } )
      .then(response => {
        if ( response.data.status == true ) {
            this.setState({
                asms: response.data.payload
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { roles, states, cities, region, area, rsms, asms } = this.state;
    return (
        <React.Fragment>
            <div class="container-fluid mt--7">
                <div class="row">
                    <div class="col">
                    <div class="card bg-secondary shadow">
                        <div class="card-header bg-white border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                            <h3 class="mb-0">Add New Staff Member</h3>
                            </div>
                            <div class="col-4 text-right">
                                <Link to={"/staff"} className="btn btn-sm btn-primary">
                                    Staff List
                                </Link>
                            </div>
                        </div>
                        </div>
                        <div class="card-body">
                        <Form method="post" className={this.state.className} noValidate validated={this.validated} onSubmit={this.handleSubmit}>
                            <h6 class="heading-small text-muted mb-4">User information</h6>
                            <div class="pl-lg-4">
                                <div class="row">
                                    <div class="col-lg-2">
                                      <div class="form-group">
                                          <label class="form-control-label" for="input-username">User Type</label>
                                          {/* <select onChange={this.loadStates} class="form-control" required>
                                              <option value="">Select</option>
                                              {roles && roles.map((roles, index) => (
                                                  <option value={roles.ur_id}>{roles.ur_title}</option>
                                              ))}
                                          </select> */}
                                          <select onChange={this.loadRegion} class="form-control" required>
                                              <option value="">Select</option>
                                              {roles && roles.map((roles, index) => (
                                                  <option value={roles.ur_id}>{roles.ur_title}</option>
                                              ))}
                                          </select>
                                      </div>
                                    </div>
                                    <div class="col-lg-2">
                                      <div class="form-group" style={{ display : this.state.regionDisplay }}>
                                          <label class="form-control-label" for="input-username">Region</label>
                                          {/* <select onChange={this.loadAreas} class="form-control" required={this.state.regionRequired}>
                                              <option selected value="">Select</option>
                                              {region && region.map((region, index) => (
                                                  <option value={region.rg_id}>{region.rg_title}</option>
                                              ))}
                                          </select> */}
                                          <select onChange={this.loadAreas} class="form-control" required={this.state.regionRequired}>
                                              <option selected value="">Select</option>
                                              {region && region.map((region, index) => (
                                                  <option value={region.rg_id}>{region.rg_title}</option>
                                              ))}
                                          </select>
                                      </div>
                                    </div> 

                                    {/* <div class="col-lg-2">
                                      <div class="form-group" style={{ display : this.state.stateDisplay }}>
                                          <label class="form-control-label" for="input-username">State</label>
                                          <select onChange={this.loadCities} class="form-control" required={this.state.stateRequired}>
                                              <option selected value="">Select</option>
                                              {states && states.map((state, index) => (
                                                  <option value={state.id}>{state.name}</option>
                                              ))}
                                          </select>
                                      </div>
                                    </div> */}

                                    <div class="col-lg-2">
                                      <div class="form-group" style={{ display : this.state.areaDisplay }}>
                                          <label class="form-control-label" for="input-username">Area</label>
                                          <select onChange={this.loadRSM} class="form-control" required={this.state.areaRequired}>
                                              <option selected value="">Select</option>
                                              {area && area.map((area, index) => (
                                                  <option value={area.ar_id}>{area.ar_title}</option>
                                              ))}
                                          </select>
                                      </div>
                                    </div>

                                    {/* <div class="col-lg-2">
                                      <div class="form-group" style={{ display : this.state.cityDisplay }}>
                                          <label class="form-control-label" for="input-username">City</label>
                                          <select onChange={this.loadRSM} class="form-control selectpicker" required={this.state.cityRequired}>
                                              <option selected value="">Select</option>
                                              {cities && cities.map((city, index) => (
                                                  <option value={city.id}>{city.city_name}</option>
                                              ))}
                                          </select>
                                      </div>
                                    </div> */}

                                    <div class="col-lg-2">
                                      <div class="form-group" style={{ display : this.state.rsmDisplay }}>
                                          <label class="form-control-label" for="input-username">RSM</label>
                                          <select onChange={this.loadASM} class="form-control" required={this.state.rsmRequired}>
                                              <option selected value="">Select</option>
                                              {rsms && rsms.map((rsms, index) => (
                                                  <option value={rsms.u_id}>{rsms.u_name}</option>
                                              ))}
                                          </select>
                                      </div>
                                    </div>
                                    <div class="col-lg-2">
                                      <div class="form-group" style={{ display : this.state.asmDisplay }}>
                                          <label class="form-control-label" for="input-username">ASM</label>
                                          <select onChange={this.loadType} class="form-control" required={this.state.asmRequired}>
                                              <option selected value="">Select</option>
                                              {asms && asms.map((asms, index) => (
                                                  <option value={asms.u_id}>{asms.u_name}</option>
                                              ))}
                                          </select>
                                      </div>
                                    </div>
                                    <div className={"spinner-border "+this.state.dnone}></div>
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
                                    <div class="text-center">
                                      <button type="submit" class="btn btn-primary my-4">Add</button>
                                      <small>Password will be the mobile number. User may change password after login!</small>
                                    </div>
                                </div>
                            </div>
                        </Form>
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