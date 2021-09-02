import React, { Component } from "react";
import TestService from "../../services/test";
import TherapyService from "../../services/therapy";
import DosdontsService from "../../services/dosdonts";
import Modal from "./modal";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";
import { Form, Button, Col, InputGroup } from "react-bootstrap";

import {  toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css'; 

//import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


//npm install --save @ckeditor/ckeditor5-font

//console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ));

//import Modal from "react-bootstrap-modal";

// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';


class Add extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.therapyList = this.therapyList.bind(this);

    this.state = {
      id : this.props.match.params.id,
      therapies : [],
      type : '',
      title : '',
      images : '',
      //therapyId : '',
      files : '',
      content : '',
      className : '',
      removeImages : []
    };
  }

  updateModel = (id, title) => {
    this.setState({ id1 : id, typetitle : title, modalVisible: 'show' });
  }

  handleChange(event) {
    let inputName = event.target.name;
    if ( event.target.files) {
      this.setState({ [inputName] : event.target.files });
    } else {
      this.setState({ [inputName] : event.target.value });
    }
  }

  removeImage = (id) => {
    let rimages = this.state.removeImages;
    rimages.push(id);
    this.setState({removeImages : rimages});
    document.getElementById('img'+id).remove();
    console.log(this.state);
  }


  componentDidMount() {
      this.therapyList();
      if ( this.state.id ) {
        this.retrieveDetail();
      }
  }

  retrieveDetail() {
    DosdontsService.get(this.state.id)
      .then(response => {
        if ( response.data.status == true ) {
            this.setState({
              type : response.data.payload.dd_type,
              title : response.data.payload.dd_title,
              therapyId : response.data.payload.dd_fk_th_id,
              content : response.data.payload.dd_content,
              images : response.data.payload.images
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }


  therapyList() {
    TherapyService.getAll({})
      .then(response => {
        if ( response.data.status == true ) {
          console.log(response.data);
          console.log(response.data.payload);
            this.setState({
              therapies : response.data.payload.data,
                //testtypes : response.data.payload.types,
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }


  handleSubmit (event) {
    console.log('this state',this.state);
    this.setState({ className : '', errors : ''  } );
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({ className : 'was-validated' } );
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      // let data = {
      //     title : this.state.title,
      //     type : this.state.type,
      //     content : this.state.content,
      //   };
      let formData = new FormData();
        //formData.append('file', this.state.files);
        formData.append('title', this.state.title);
        formData.append('type', this.state.type);
        formData.append('content', this.state.content);
        formData.append('removeImages', this.state.removeImages);
        for (let i = 0; i <= (this.state.files.length)-1; i++ ) {
          formData.append('img'+i, this.state.files[i]);
        }

      if ( this.state.id ) {
        
        DosdontsService.update( this.state.id, formData )
        .then(response => {
            if ( response.data.status == false ) {
            toast.error(response.data.message);
            this.setState({ className : 'was-validated'  } );
            } else {
            toast.success(response.data.message);
            this.props.history.push("/do-dont");
            }
        })
        .catch(e => {
            console.log(e);
        });
      } else {
        // const formData = new FormData();
        // formData.append('title', this.state.title);
        // formData.append('type', this.state.type);
        // formData.append('content', this.state.content);
        // for (let i = 0; i <= (this.state.files.length)-1; i++ ) {
        //   formData.append('img'+i, this.state.files[i]);
        // }
        DosdontsService.create(formData)
        .then(response => {
            if ( response.data.status == false ) {
            toast.error(response.data.message);
            this.setState({ className : 'was-validated'  } );
            } else {
            toast.success(response.data.message);
            this.props.history.push("/do-dont");
            }
        })
        .catch(e => {
            console.log(e);
        }); 
      }
      
    }
    
  }

 
 
  render() {
    const  { id, images } = this.state;
    let h3 = "Add New do's or dont's";
    let buttonTXT = 'Add';
    if ( id != undefined ) {
        h3 = "Update do's or dont's";
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
                                <Link to={"/do-dont"} className="btn btn-sm btn-primary">
                                    Do's/Dont's List
                                </Link>
                            </div>
                        </div>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div className="col-lg-12">
                              <Form method="post" className={this.state.className} noValidate validated={this.validated} onSubmit={this.handleSubmit}>
                                  <div class="pl-lg-4">
                                      <div class="row">
                                          <div class="col-lg-9">
                                              <div class="form-group">
                                                  <label class="form-control-label" for="title">Title</label>
                                                  <input required type="text" name="title" value={this.state.title} class="form-control form-control-alternative" onChange={this.handleChange}/>
                                              </div>
                                          </div>
                                          <div class="col-lg-3">
                                              <div class="form-group">
                                                  <label class="form-control-label" for="title">Type</label>
                                                  <select required name="type" onChange={this.handleChange} class="form-control form-control-alternative">
                                                      <option value=''>Select Type</option>
                                                      <option selected={this.state.type == '1' ? 'selected' : '' } value='1'>Do's</option>
                                                      <option selected={this.state.type == '2' ? 'selected' : '' }  value='2'>Dont's</option>
                                                  </select>
                                              </div>
                                          </div>
                                          {/* <div class="col-lg-6">
                                              <div class="form-group">
                                                  <label class="form-control-label" for="title">Select Therapy</label>
                                                  <select required name="therapyId" onChange={this.handleChange} class="form-control form-control-alternative">
                                                    <option value=''>Select Therapy</option>
                                                    {this.state.therapies && this.state.therapies.map((therapy, index) => (
                                                        <option selected={this.state.therapyId == therapy.th_id ? 'selected' : '' } value={therapy.th_id}>{therapy.th_title}</option>
                                                    ))}
                                                  </select>
                                              </div>
                                          </div> */}
                                          <div class="col-lg-12">
                                            {/* <CKEditor
                                                editor={ ClassicEditor }
                                                data={this.state.content}
                                                config={{
                                                  //plugins: [ EasyImage ],
                                                  toolbar: {
                                                    items: [
                                                      'heading', '|',
                                                      'fontfamily', 'fontsize', '|',
                                                      'alignment', '|',
                                                      'fontColor', 'fontBackgroundColor', '|',
                                                      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                                                      'link', '|',
                                                      'outdent', 'indent', '|',
                                                      'bulletedList', 'numberedList', 'todoList', '|',
                                                      'code', 'codeBlock', '|',
                                                      'insertTable', '|',
                                                      'uploadImage', 'blockQuote', '|',
                                                      'undo', 'redo'
                                                  ],
                                                  shouldNotGroupWhenFull: true
                                                },
                                                  ckfinder: {
                                                    uploadUrl: 'http://3.138.152.42:3300/quick-upload'
                                                  }
                                                }}
                                                onReady={ editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log( 'Editor is ready to use!', editor );
                                                } }
                                                onChange={ ( event, editor ) => {
                                                    let data = editor.getData();
                                                    //console.log( { event, editor, data } );
                                                    this.setState({content : data});
                                                } }
                                                onBlur={ ( event, editor ) => {
                                                    console.log( 'Blur.', editor );
                                                } }
                                                onFocus={ ( event, editor ) => {
                                                    console.log( 'Focus.', editor );
                                                } }
                                            /> */}
                                            <div class="form-group">
                                              <label class="form-control-label" for="content">Content</label>
                                              <textarea className="form-control" onChange={this.handleChange} name="content" value={this.state.content}></textarea>
                                            </div>
                                          </div>
                                          <div class="col-lg-12">
                                            {images && images.map((image, index) => (
                                              <div class="thumbnail" id={'img'+image.ddi_id}>
                                                <img class="img-fluid" style={{'max-width': '250px'}} src={image.url} />
                                                <a href="#!" onClick={() => this.removeImage(image.ddi_id)}><i class="fa fa-times"></i></a>
                                              </div>
                                            ))}
                                          </div>
                                          <div class="col-lg-12">
                                              <div class="form-group">
                                                  <label class="form-control-label" for="content">Upload Image(s)</label>
                                                  <input className="form-control" onChange={this.handleChange} type="file" id="files" name="files" multiple/>
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
                    </div>
                </div>
                <Footer></Footer>
                </div>
        </React.Fragment>
    );
  }
}

export default Add;