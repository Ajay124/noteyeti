let passwordHash 		= require('password-hash');
// let jwt			        = require('jsonwebtoken');
let helper          = require('../helper/index');
const Busboy 	  = require('busboy');
//let adminModel      = require('../models').admins;
let userModel      = require('../models').users;
//let imageLikes      = require('../models').image_likes;
//let everificationModel      = require('../models').email_verification;

let uuidv1        = require('uuid').v1;
const path 				= require('path');
const fs 				= require('fs');

var multer  = require('multer');

let constant        = require('../config/constant');
const { Op } = require("sequelize");
const sequelize = require("sequelize");
//const { Op, QueryTypes  } = require("sequelize");
let user = {};

var template_path = './uploads';

var storage = multer.diskStorage({
	destination: template_path,
	filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `image-${Date.now()}.${ext}`);
      }
});

user.updateProfileOLD =  async function(req, res) {
    //let id = helper.getUUIDByTocken( req, 'T' );
    let userDetail = helper.getTokenDetail(req);
    if ( userDetail && userDetail.id != null && userDetail.id != '' ) {
      var abc = { id :  userDetail.id } ;
      //let formData = new Map();
      var busboy = new Busboy({
           headers: req.headers,
           limits: {
              fileSize: 5*1024*1024
            } 
          });
  
      var counter = 0;
  
      if ( busboy.opts.headers['content-length'] == 0 ) {
        let obj =  {
          status  : true,
          code    :  "",
          message : "Image required",
          payload : []
        }
        helper.errorHandler( res, obj );
        return req.pipe(busboy);
      }
  
      busboy.on('field', function(fieldname, val) {
        //formData.set(fieldname, val);
        abc[fieldname] = val;
        //console.log(abc);
      });

      console.log('req.body',abc);
    
      console.log('abc goes here123',abc);
      busboy.on('file', function(fieldname, file, filename, _encoding, mimetype) {
        // let keys = [
        //   'username',
        //   'dob',
        //   'fullname',
        //   'password',
        //   'visibility'
        // ];

        let keys = [];

        console.log('fieldname',fieldname);
    
        if ( keys.every(key => Object.keys(abc).includes(key)) ) {
          var ext = (path.extname(filename).toLowerCase());
  
          if ( mimetype !== 'image/png' && mimetype !== 'image/jpeg' && mimetype !== 'image/gif' && mimetype !== 'image/jpg' ) {
            let obj =  {
              status  : true,
              message : "invalid extension!",
              payload : []
            }
            //abc.push(obj);
            file.resume();
            helper.errorHandler( res, obj );
          } else {
            counter++;
            
            let filename = Date.now();
            var newName = filename + ext,
                saveTo  = './uploads/profile_image/'+newName;
          
            abc[fieldname] = newName;
            file.pipe(fs.createWriteStream(saveTo));
            
            file.on('end', function() {
              /*let obj =  {
                payload : { 
                  name : newName
                }
              }
              if ( formData.get('name') ) {
                obj.payload.newname = formData.get('patient_id');
              }
              abc.push(obj);*/
            });
          }
        } else {
          helper.successHandler( res, { status : false, message : 'Validation error'} );
        }
        
      });
      busboy.on('finish', async function() {
        //console.log('abc',abc);
        //console.log('userDetail',userDetail);
        let auth = true;
        
        if ( auth == true ) {
            let updateData = {};
            if ( abc.username && abc.username != '' ) {
                updateData.u_username = abc.username;
            }
            if ( abc.dob && abc.dob != '' ) {
                updateData.u_dob = abc.dob;
            }
            if ( abc.fullname && abc.fullname != '' ) {
                updateData.u_full_name = abc.fullname;
            }
            
            if ( abc.visibility && abc.visibility != '' ) {
                updateData.u_ispublic = abc.visibility;
            }
            if ( abc.password && abc.password != '' ) {
                updateData.u_password = passwordHash.generate(abc.password);
            }
            
  
            if ( abc.image && abc.image != '' ) {
                updateData.u_image = abc.image;
            }
  
            userModel.update(
                updateData,
                { returning: true, where: { id : userDetail.id } }
              )
              .then(async data => {
                if ( data ) {
                    //console.log('data',data);
                    let response = {
                        //id : userDetail.u_uuid,
                        username : abc.username,
                        dob : abc.dob,
                        name : abc.fullname,
                        visibility : abc.visibility,
                    };
                        
                    response.image = abc.image;
                    if ( abc.u_image != '' ) {
                        response.image = constant.BASE_URL+'/uploads/profile_image/'+abc.image;
                    } else {
                        response.image = constant.BASE_URL+'uploads/profile_image/dummy_user.png';
                    }
                    helper.successHandler( res, { message : 'Profile Updated Successfully.', payload : response } );
                } else {
                  helper.successHandler( res, { message : "Can't proceed. Try after some time." } );
                }
              })
              .catch(err => {
                  console.log(err);
                helper.errorHandler( res, { message : err } );
              });
        } else {
            helper.successHandler( res, { status: false, message : "Password not matched!" } );
        }
        
      });
      return req.pipe(busboy);
    } else {
      let obj = {
        status 		: false,
        message		: "Image Not Found"
      }
      helper.errorHandler(res, obj,200)
    }
}


user.updateProfile =  async function(req, res) {
  let userDetail = helper.getTokenDetail(req);
  console.log('userDetail',userDetail);
  if ( userDetail && userDetail.id != null && userDetail.id != '' ) {
    let updateData = {};
    let response = {};
          if ( req.body.username && req.body.username != '' ) {
              updateData.u_username = req.body.username;
              response.username = req.body.username;
          }
          if ( req.body.email && req.body.email != '' ) {
              updateData.u_email = req.body.email;
              response.email = req.body.email;
          }
          if ( req.body.mobile && req.body.mobile != '' ) {
              updateData.u_mobile = req.body.mobile;
              response.mobile = req.body.mobile;
          }
          
          if ( req.body.password && req.body.password != '' ) {
              updateData.u_password = passwordHash.generate(req.body.password);
          }

          let continu = true;

          if ( req.body.email ) {
            let total_count = await userModel.count({
              where : {
                u_email : req.body.email,
                id : {
                  [Op.not] : userDetail.id
                }
              }
            });
            if ( total_count > 0 ) {
              continu = false;
            } 
          } 
          
          if ( continu ) {
            userModel.update(
              updateData,
              { returning: true, where: { id : userDetail.id } }
            )
            .then(async data => {
              if ( data ) {
                  helper.successHandler( res, { message : 'Profile Updated Successfully.', payload : response } );
              } else {
                helper.successHandler( res, { message : "Can't proceed. Try after some time." } );
              }
            })
            .catch(err => {
                console.log(err);
              helper.errorHandler( res, { message : err } );
            });
          } else {
            helper.successHandler( res, { status:false, message : 'User with this email already exists!' } );
          }
  } else {
    let obj = {
      status 		: false,
      message		: "Image Not Found"
    }
    helper.errorHandler(res, obj,200)
  }
}

user.changePassword = async (req,res) => {
    let userDetail = helper.getTokenDetail(req);
    if ( userDetail ) {
      userModel.findByPk(userDetail.id)
      .then(result => {
        if ( passwordHash.verify(req.body.password, result.u_password) ) {
          let hashedPassword  = passwordHash.generate(req.body.newpassword);
          userModel.update(
            { u_password : hashedPassword },
            {returning: true, where: {id: result.id} }
          );
          helper.successHandler( res , { message : 'Password Updated Successfully!' } );
        } else {
          helper.successHandler( res , { status : false, message : 'Old Password not matched!' } );
        }
      })
      .catch(err => {
        helper.errorHandler( res, { message : err } );
      });
    } else {
      helper.successHandler( res, { sataus : false, message : 'Token has been expired!' } );
    }
}


user.images = async (req, res) => {
	let userDetail = helper.getTokenDetail(req);
	if ( userDetail ) {
    
		let total_count = await userModel.count({
			where : {
				id : {
          [Op.not] : userDetail.id
        },
        u_ispublic : '1'
			}
		});
		let per_page = req.body.per_page ? req.body.per_page : 10,
			total_records = total_count,
			page = req.body.page ? req.body.page : 0,
			offset = page * per_page;
		let list = await userModel.findAll({
			where : {
				id : {
          [Op.not] : userDetail.id
        },
        u_ispublic : '1'
			},
      attributes : [
				['u_uuid','id'],
        ['u_image','image']
			],
      include: [{
			  model: imageLikes,
        as : 'liked',
			  attributes : [
				'id',
			  ]
			}],
			offset: offset,
			limit: per_page
		}).then( async data => {
			helper.successHandler( res, { message : 'Image List', payload : { data : data, per_page : per_page, total_records : total_records, page_number : parseInt(page), total_pages : Math.ceil( total_records/per_page ) } } ); 
		}).catch(err => {
			console.log(res);
			helper.errorHandler( res, { message : err } );
		});
	} else {
		helper.successHandler( res, { status : false, message : 'User not found!'});
	}
};

user.likeImage = async (req, res) => {
	let userDetail = helper.getTokenDetail(req);
	if ( userDetail ) {
		let liked_to = await userModel.findOne({
			where : {
			  u_uuid : req.body.id,
			}
		});
		if( liked_to ) {
			let ifexist = await imageLikes.findOne({
				where : {
				  il_by : userDetail.id,
				  il_to : liked_to.id,
				}
			});
			if ( ifexist ) {
				await imageLikes.destroy({
					where: { 
						id: ifexist.id 
				   }
			   });

				helper.successHandler( res, { sataus : true, message : 'Unliked successfully!' } );
			} else {
				let insertData = {
					//fo_uuid      : uuidv1(Date.now()),
					il_by : userDetail.id,
					il_to : liked_to.id,
				};
				imageLikes.create(insertData)
				.then( async data => {
				  if ( data ) {
					  helper.successHandler( res, { message : 'Liked successfully!.' } );
				  } else {
					  helper.errorHandler( res );
				  }
				})
				.catch(err => {
				  helper.errorHandler( res, { message : err } );
				});
			}
			
		} else {
			helper.successHandler( res, { sataus : false, message : 'You are at wrong place.' } );
		}
	} else {
		helper.successHandler( res, { sataus : false, message : 'You are at wrong place.' } );
	}
};


user.findAll = async (req , res) => {
  console.log('req.body',req.body);
  let where = {};
  if ( req.body.searchTitle && req.body.searchTitle!='' ) {
    where = {
      [Op.or] : [
        { u_username: {
          [Op.like]: '%'+req.body.searchTitle+'%'
          },
        },
        { u_mobile: {
          [Op.like]: '%'+req.body.searchTitle+'%'
          },
        },
        { u_email: {
          [Op.like]: '%'+req.body.searchTitle+'%'
          },
        },
      ]
    };
  }
  
  let total_count = await userModel.count({
    where : where
  });

  let per_page = req.body.per_page ? req.body.per_page : 10,
      total_records = total_count,
      page = req.body.page ? req.body.page : 0,
      offset = page * per_page;

  userModel.findAll({
      where : where,
      attributes : [
        'u_uuid',
        'u_username',
        'u_mobile',
        'u_email',
      ],
      offset: offset,
      limit: per_page,
      //group: ['users.id']
  }).then( async data => {
    helper.successHandler( res, { message : 'User List!', payload : { data : data, per_page : per_page, total_records : total_records, page_number : parseInt(page), total_pages : Math.ceil( total_records/per_page ) } } ); 
  }).catch(err => {
    console.log(err);
    helper.errorHandler( res, { message : err } );
  });
};


user.findOne = async (req, res) => {
  let userDetail = helper.getTokenDetail(req);
  if ( userDetail ) {
    userModel.findOne({
        where : {
          u_uuid : req.params.id,
        },
        attributes : [
          'id',
          'u_uuid',
          ['u_name','name'],
          ['u_email','email'],
          ['u_location','location'],
          ['u_latitude','latitude'],
          ['u_longitude','longitude'],
          ['u_bio','about'],
          //['u_image','image'],
          ["concat('"+constant.BASE_URL+'/'+constant.UPLOAP_PATH+"profile_image/',  u_image)" , 'image'],
          ['u_gender','gender'],
          //[Sequelize.fn("COUNT", Sequelize.col('following.fo_uuid')), 'followingCount']
          //[Sequelize.fn("COUNT",'followings.id'), 'followingCount'],
          //[Sequelize.fn("COUNT",'waypoints.id'), 'waypointCount']
        ],
        include: [{
          model: followerModel,
          required: false,
          as : 'following',
          where : {
            fo_follower_id : userDetail.id
          },
          attributes: ['id'],
        },{
          model: blockModel,
          required: false,
          as : 'blockto',
          where : {
            bl_by : userDetail.id,
            //fo_following_id : {$col: 'userModel.id'}
            //fo_following_id : {[Op.col]: 'users.id'}
          },
          attributes : [
            'id',
            //'fo_follower_id'
          ],
        }],
    })
    .then( async data => {
      let result = data.toJSON();

      let userFollowing = await followerModel.count({
        where : {
          fo_follower_id : data.id,
        }
      });

      let waypointFollowing = await followerWyModel.count({
        where : {
          fow_follower_id : data.id,
        }
      });
      
      result.followings = userFollowing + waypointFollowing;
      result.followers = await followerModel.count({
        where : {
          fo_following_id : data.id,
        }
      });

      result.waypoints = await waypointModel.count({
        where : {
          wp_fk_u_id : data.id,
        }
      });

      helper.successHandler( res , { payload : result } );
    })
    .catch(err => {
      console.log('error goes here',err);
      helper.errorHandler( res, { message : err } );
    });
  } else {
      helper.successHandler( res, { sataus : false, message : 'You are at wrong place!' } );
  }

};

user.updateAdmin = async (req, res) => {
  let data = {}; 

  let ret = true;
  if ( req.body.password && req.body.cpassword ) {
    ret = false;
    if ( req.body.password == req.body.cpassword ) {
      ret = true;
      data.password = passwordHash.generate(req.body.password);
    }
  }

  if ( ret ) {
    adminModel.update(
      data,
      {returning: true, where: {id: 1} }
    )
    .then(data => {
      helper.successHandler( res, { payload : data } );
    })
    .catch(err => {
      helper.errorHandler( res, { message : err } );
    });
  } else {
    helper.successHandler( res, { status:false, message : 'Password not matched!' } );
  }
};

user.update = async (req, res) => {
let count = await userModel.count({
  where : {
    u_uuid : {
      [Op.not]: req.params.id
    },
    [Op.or]: [
      { u_email: req.body.email },
      { u_phone: req.body.phone }
    ]
  }
});
if ( count > 0 ) {
  helper.successHandler( res, { status:false, message : 'User with this mobile already exists!' } );
} else {
  let data = {};

  if ( req.body.name ) {
      data.u_name = req.body.name;
  }
  if ( req.body.email ) {
      data.u_email = req.body.email;
  }
  if ( req.body.phone ) {
      data.u_phone = req.body.phone;
  }

  if ( req.body.address ) {
      data.u_address = req.body.address;
  }
  

  let ret = true;
  // if ( req.body.password && req.body.cpassword ) {
  //   ret = false;
  //   if ( req.body.password == req.body.cpassword ) {
  //     ret = true;
  //     data.u_password = passwordHash.generate(req.body.password);
  //   }
  // }

  if ( ret ) {
    userModel.update(
      data,
      {returning: true, where: {u_uuid: req.params.id} }
    )
    .then(data => {
      helper.successHandler( res, { payload : data } );
    })
    .catch(err => {
      helper.errorHandler( res, { message : err } );
    });
  } else {
    helper.successHandler( res, { status:false, message : 'Password not matched!' } );
  }
}
};

user.delete = async (req, res) => {
  let id = req.params.id;
  userModel.destroy({
    where : {
        u_uuid : id,
    }
  })
  .then(data => {
    if ( data ) {
      helper.successHandler( res, { message : 'User created successfully!.' } );
    } else {
      helper.errorHandler( res );
    }
  }).catch(err => {
    helper.errorHandler( res, { message : err } );
  });
};

user.deleteThis = async (id, res) => {
await userModel.delete( id )
  .then(data => {
    helper.successHandler( res, { message : 'Deleted Successfully!' } );
  })
  .catch(err => {
    helper.errorHandler( res, { message : err } );
  });
}

module.exports = user;