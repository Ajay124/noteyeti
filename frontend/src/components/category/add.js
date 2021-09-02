import React, { Component } from "react";
import CategoryService from "../../services/category";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
import {  toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';    

class Add extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    

    this.state = {
      id : this.props.match.params.id,
      title : '',
      className : '',
    };
  }

  handleChange(event) {
    let inputName = event.target.name;
    this.setState({ [inputName] : event.target.value });
  }


  componentDidMount() {
    if ( this.state.id ) {
        this.retrieveTherapyDetail();
    }
  }


  retrieveTherapyDetail() {
    CategoryService.get(this.state.id)
      .then(response => {
        if ( response.data.status == true ) {
            this.setState({
                title : response.data.payload.cat_name,
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
        CategoryService.update( this.state.id, data )
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
      } else {
        CategoryService.create(data)
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
      
    }
    
  }

 
  render() {
    const  { id } = this.state;
    let h3 = 'Add New Category';
    let buttonTXT = 'Add';
    if ( id != undefined ) {
        h3 = 'Update Category';
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
                                <Link to={"/categories"} className="btn btn-sm btn-primary">
                                    Category List
                                </Link>
                            </div>
                        </div>
                        </div>
                        <div class="card-body">
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
                    </div>
                    </div>
                </div>
                <Footer></Footer>
                </div>
        </React.Fragment>
    );
  }
}

export default Add;