let passwordHash 		= require('password-hash');
let jwt			        = require('jsonwebtoken');
let helper          = require('../helper/index')
let adminModel      = require('../models').admins;
let userModel      = require('../models').users;
let everificationModel      = require('../models').email_verifications;

let uuidv1        = require('uuid').v1;
const path 				= require('path');
const fs 				= require('fs');

var multer  = require('multer');

let constant        = require('../config/constant');
const { Op } = require("sequelize");
let auth = {};

var template_path = './uploads';

var storage = multer.diskStorage({
	destination: template_path,
	filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `image-${Date.now()}.${ext}`);
      }
});

auth.signup = async (req,res) => {
  console.log(req.body);
  let condition = { 
      u_email: req.body.email 
    };

  let total_count = await userModel.count({
    where : condition
  });

  if ( total_count > 0 ) {
    helper.successHandler( res, { status:false, message : 'User with this email already exists!' } );
  } else {
    let OTP = Math.floor(Math.random() * (+98765 - +12345)) + +12345;
    

    let data = {
      ev_uuid : uuidv1(Date.now()),
      ev_email : req.body.email,
      ev_otp : OTP,
	  };
        

    everificationModel.create(data)
      .then(data => {
        if ( data ) {
          let message = '<h3>Rankedapp registration OTP</h3>';
          message+= 'OTP : '+OTP;
          
          helper.sendMail({
            to : data.get('ev_email'),
            subject : 'Rankedapp Registration',
            message : message
          });
          helper.successHandler( res, { message : 'OTP send to your email!.', payload : { id : data.get('ev_uuid'), email : data.get('ev_email')} } );
        } else {
          helper.errorHandler( res );
        }
    }).catch(err => {
      helper.errorHandler( res, { message : err } );
    });
  }
}


auth.verifyOTP = async (req, res) => {
  
  let record = await everificationModel.findOne({
    where : {
      ev_uuid : req.body.id,
      ev_email : req.body.email
    }
  });

  console.log('record',record);

  if ( record ) {
    if ( record.ev_otp == req.body.otp ) {
      let insertData = {
        u_uuid : uuidv1(Date.now()),
        u_email : req.body.email,
        // u_password : passwordHash.generate(req.body.password),
        u_device_id : req.body.device_id,
        u_device_token : req.body.device_token,
        u_device_platform :  req.body.device_platform
      };
      userModel.create(insertData).then(data => {
        if ( data ) {
          let payload = {
            iat : Date.now(),
            "uuid" : data.get('u_uuid'),
            "email"  : data.get('u_email'),
            "id" : data.get('id')
          };

          let tokenstring = jwt.sign( payload, constant.secret );
          let response = { 
            email : data.get('u_email'), 
            username : data.get('u_username') ? data.get('u_username') : '',
            issocial : data.get('u_issocial'),
            mobile : data.get('u_mobile') ? data.get('u_full_name') : '',
            token : tokenstring,
          }

          everificationModel.destroy({
            where: { 
              ev_email : req.body.email 
           }
          });

          helper.successHandler( res, { message : 'OTP send to your email!.', payload : response } );
        } else {
          helper.errorHandler( res );
        }
      });
    } else {
      helper.successHandler( res, { status : false, message : 'OTP not matched.'} );
    }
  } else {
    helper.errorHandler( res );
  }
}


auth.adminLogin = (req, res) => {
  adminModel.findAll({
    where : {
      name : req.body.name,
    }
  }).then(result => {
    if ( result.length > 0 ) {
      if ( passwordHash.verify(req.body.password, result[0].password) ) {
        let payload = {
          iat : Date.now(),
          //"orgId" : data[0].u_uuid,
          "email"  : 'admin@rankedapp.com'
        };
        //console.log('result goes here',result);
        let token = jwt.sign( payload,  constant.secret );

        helper.successHandler( res, { payload : { token : token }} );
      } else {
        helper.successHandler( res, { status : false, message : 'Wrong username/password!'} ); 
      }
      //helper.successHandler( res, { payload : result} );
    } else {
      helper.successHandler( res, { status : false , message : 'Wrong username/password!' } );
    }
  }).catch(err => {
    console.log('err',err);
    helper.errorHandler( res )
  });
};


auth.login = (req, res) => {
  userModel.findOne({
    where : {
      u_email : req.body.email
    }
  }).then(async result => {
	  //console.log('result goes here', result);
    if ( result ) {
			if ( passwordHash.verify(req.body.password, result.u_password) ) {
			  userModel.update(
				{ u_device_id : req.body.device_id , u_device_token : req.body.device_token, u_device_platform : req.body.device_platform },
				{returning: true, where: {id: result.id} }
			  );

			  let payload = {
          iat : Date.now(),
          "uuid" : result.u_uuid,
          "id" : result.id,
          "email"  : result.u_email
			  };
			  let token = jwt.sign( payload,  constant.secret );
	  
			  let response = {
          name : result.u_full_name,
          email : result.u_email,
          username : result.u_username,
          //issocial : result.u_issocial,
          mobile : result.u_mobile,
          token : token,
			  };

			  helper.successHandler( res, { payload : response } );
			} else {
			  helper.successHandler( res, { status : false, message : 'Wrong username/password!'} ); 
			}
    } else {
      helper.successHandler( res, { status : false , message : 'Wrong email/password!' } );
    }
  }).catch(err => {
    console.log('err',err);
    helper.errorHandler( res )
  });
};


auth.forgotPassword = async (req, res) => {
  userModel.findOne({
    where : {
      u_email: req.body.email
    },
  }).then(result => {
    if ( result ) {
		let OTP = Math.floor(Math.random() * (+98765 - +12345)) + +12345;
        userModel.update(
          { u_otp : OTP },
          { returning: true, where: { id : result.id } }
        )
        .then(data => {
          if ( data ) {
            helper.sendMail({
              to : result.u_email,
              subject : 'Noteapp Forgot Password',
              message : '<p>Forgot password OTP is : <b>'+ OTP + '</b></p>'
            });
            helper.successHandler( res, { message : 'OTP sent to your email!', payload : { email : result.u_email , id : result.u_uuid } } );
          } else {
            helper.successHandler( res, { message : "Can't proceed. Try after some time." } );
          }
        })
        .catch(err => {
          helper.errorHandler( res, { message : err } );
        });
    } else {
      helper.successHandler( res, { status : false, message : 'Email not found!'} ); 
    }
  }).catch(err => {
    console.log('err',err);
    helper.errorHandler( res )
  });
}

auth.verifyForgotPassword = async (req, res) => {
  userModel.findOne({
    where : {
      u_email: req.body.email,
	    u_uuid: req.body.id
    },
  }).then(result => {
    if ( result ) {
      if ( result.u_otp == req.body.otp ) {
		let OTP = Math.floor(Math.random() * (+98765 - +12345)) + +12345;
		userModel.update(
          { u_otp : OTP },
          { returning: true, where: { id : result.id } }
        )
		helper.successHandler( res, { message : 'OTP verified successfully. Set new password', payload : { id : result.u_uuid, otp : OTP } } );
      } else {
        helper.successHandler( res, { status : false, message : 'OTP does not match!'} );
      }
    } else {
      helper.successHandler( res, { status : false, message : 'Email not found!'} ); 
    }
  }).catch(err => {
    console.log('err',err);
    helper.errorHandler( res )
  });
}


auth.setPassword = async (req, res) => {
  userModel.findOne({
    where : {
      u_uuid: req.body.id,
	    u_otp : req.body.otp
    },
  }).then(result => {
    if ( result ) {
        //let password = Math.random().toString(36).slice(-8)
        let hashedPassword  = passwordHash.generate(req.body.password);
        userModel.update(
          { u_password : hashedPassword },
          { returning: true, where: { id : result.id } }
        )
        .then(data => {
          if ( data ) {
            helper.successHandler( res, { message : 'New password has been set. Kindly login.' } );
          } else {
            helper.successHandler( res, { message : "Can't proceed. Try after some time." } );
          }
        })
        .catch(err => {
          helper.errorHandler( res, { message : err } );
        });
    } else {
      helper.successHandler( res, { status : false, message : 'Token/Account not matched!'} ); 
    }
  }).catch(err => {
    console.log('err',err);
    helper.errorHandler( res )
  });
}


auth.logout = function(req, res) {
	let userDetail = helper.getTokenDetail(req);
	userModel.update(
	{ u_device_id : '', u_device_token : '' },
	  { returning: true, where: { id : userDetail.id } }
	)
	.then(data => {
	  if ( data ) {
		helper.successHandler( res, {} );
	  } else {
		helper.successHandler( res, { message : "Can't proceed. Try after some time." } );
	  }
	})
	.catch(err => {
	  helper.errorHandler( res, { message : err } );
	});
}


auth.socialLogin = (req, res) => {
  userModel.findOne({
    where : {
          u_socialid : req.body.id
        },
  }).then( async result => {
    if ( result ) {
      userModel.update(
      { u_device_id : req.body.device_id , u_device_token : req.body.device_token, u_device_platform : req.body.device_platform },
      {returning: true, where: {id: result.id} }
      )

      let payload = {
        iat : Date.now(),
        "uuid" : result.u_uuid,
        "id" : result.id,
        "email"  : result.u_email
      };
      let token = jwt.sign( payload,  constant.secret );
      let issocial = '0';
      if( result.u_password == null ) {
        issocial = '1';
      }
      let response = {
        id : result.u_uuid,
        username : result.u_username,
        email : result.u_email,
        mobile : result.u_mobile,
        issocial : issocial,
        token : token,
      };
      
      helper.successHandler( res, { payload : response } );
    } else {
    userModel.findOne({
      where : {
            u_email : req.body.email
          },
    }).then( async result1 => {
      if ( result1 ) {
        userModel.update(
        { u_device_id : req.body.device_id , u_device_token : req.body.device_token, u_device_platform : req.body.device_platform, u_username : req.body.username, u_issocial: '1', u_social_paltform :  req.body.platform, u_socialid : req.body.id },
        {returning: true, where: {u_email: req.body.email} }
        )
        let payload = {
          iat : Date.now(),
          "uuid" : result1.u_uuid,
          "id" : result1.id,
          "email"  : result1.u_email
        };
        let token = jwt.sign( payload,  constant.secret );
        let issocial = '0';
        if( result1.u_password == null ) {
          issocial = '1';
        }
        let response = {
          //id : result1.u_uuid,
          username : result1.u_username,
          email : result1.u_email,
          mobile : result1.u_mobile,
          issocial : issocial,
          token : token,
        };
        helper.successHandler( res, { payload : response } );
      } else {
        let data = {
          u_uuid : uuidv1(Date.now()),
          u_username : req.body.username,
          u_email : req.body.email,
          u_mobile : req.body.mobile,
          u_issocial : '1',
          u_socialid : req.body.id,
          u_social_paltform : req.body.paltform,
          //u_password : passwordHash.generate(req.body.password),
          u_device_id : req.body.device_id,
          u_device_token : req.body.device_token,
          u_device_platform :  req.body.device_platform
      };
      
      userModel.create(data)
        .then(data => {
        if ( data ) {
          let payload = {
            iat : Date.now(),
            "uuid" : data.get('u_uuid'),
            "id" : data.get('id'),
            "email"  : data.get('u_email')
            };
          let token = jwt.sign( payload,  constant.secret );
          //console.log('result goes here',result);
          let issocial = '0';
          if( data.get('u_password') == null ) {
            issocial = '1';
          }
          let response = {
            id : data.get('u_uuid'),
            username : data.get('u_username'),
            email : data.get('u_email'),
            mobile : data.get('u_mobile'),
            issocial : issocial,
            token : token,
          };
          helper.successHandler( res, { payload : response } );
        } else {
          helper.errorHandler( res );
        }
      }).catch(err => {
        helper.errorHandler( res, { message : err } );
      });
      }
    }).catch(err => {
      console.log('err',err);
      helper.errorHandler( res )
    });
      //helper.successHandler( res, { status : false , message : 'Wrong username/password!' } );
  }
  }).catch(err => {
    console.log('err',err);
    helper.errorHandler( res )
  });
};

module.exports = auth;