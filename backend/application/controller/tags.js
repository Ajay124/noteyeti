
let helper          = require('../helper/index');
//let adminModel      = require('../models').admins;
let userModel      = require('../models').users;
let tagsModel      = require('../models').tags;
const q           = require('q');

let uuidv1        = require('uuid').v1;
const path 				= require('path');
const fs 				= require('fs');

var multer  = require('multer');

let constant        = require('../config/constant');
const { Op } = require("sequelize");
const sequelize = require("sequelize");
//const { Op, QueryTypes  } = require("sequelize");
let tags = {};

var template_path = './uploads';

var storage = multer.diskStorage({
	destination: template_path,
	filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `image-${Date.now()}.${ext}`);
      }
});


tags.addTags = async (req, res) => {
    let userDetail = helper.getTokenDetail(req);
    if ( userDetail ) {
        console.log('req.body',req.body);
        let tagsSTR = JSON.parse(req.body.tags);
        if ( tagsSTR.length > 0 ) {
            await tags.addUpdate( tagsSTR, userDetail.id );
            tagsModel.findAll({
                where : {
                    tg_fk_u_id : userDetail.id
                },
                attributes : [
                    ['id','tag_id'],
                    ['tg_uuid','id'],
                    ['tg_title','title']
                ]
            }).then( data => {
                console.log('data',data);
                helper.successHandler( res, { message : 'Success', payload : data } );
            });
        } else {
            helper.errorHandler( res );
        }
    } else {
      helper.errorHandler( res );
    }
}

tags.addUpdate  = async ( tags, id ) => {
    let deferred = q.defer();
    /*for (const tag of tags) {
        if ( tag.id && tag.id != '') {
            //tags.updateTag(tag, userDetail.id);
            let updateData = {
                tg_title : tag.title,
            };
            tagsModel.update(
                updateData,
                { where: { tg_uuid : tag.id, tg_fk_u_id : id  } }
            );
        } else {
            //tags.createTag(tag, userDetail.id );
            let insertData = {
                tg_uuid : uuidv1(Date.now()),
                tg_title : tag.title,
                tg_fk_u_id : id,
            };
            tagsModel.create(insertData);
        }
    }*/

    await (q.all(tags.map( async function(tag) {
        if ( tag.id && tag.id != '') {
            //tags.updateTag(tag, userDetail.id);
            let updateData = {
                tg_title : tag.title,
            };
            await tagsModel.update(
                updateData,
                { where: { tg_uuid : tag.id, tg_fk_u_id : id  } }
            );
        } else {
            //tags.createTag(tag, userDetail.id );
            let insertData = {
                tg_uuid : uuidv1(Date.now()),
                tg_title : tag.title,
                tg_fk_u_id : id,
            };
            await tagsModel.create(insertData);
        }
    })));

    deferred.resolve(true);
    return deferred.promise;
}


tags.updateTag  = ( tag, id ) => {
    let updateData = {
        tg_title : tag.title,
    };
    tagsModel.update(
        updateData,
        { returning: true, where: { tg_uuid : tag.id, tg_fk_u_id : id  } }
    );
}


tags.delete = async (req, res) => {
    let userDetail = helper.getTokenDetail(req);
    if ( userDetail ) {
        let id = req.params.id;
        tagsModel.destroy({
            where : {
                tg_uuid : id,
                tg_fk_u_id : userDetail.id
            }
        })
        .then(data => {
            if ( data ) {
                helper.successHandler( res, { message : 'Tag deleted successfully!.' } );
            } else {
                helper.errorHandler( res );
            }
        }).catch(err => {
            helper.errorHandler( res, { message : err } );
        });
    } else {
        helper.errorHandler( res );
    }
};


tags.findAll = async (req , res) => {
    let userDetail = helper.getTokenDetail(req);
    if ( userDetail ) {
        tagsModel.findAll({
            where : {
                tg_fk_u_id : userDetail.id
            },
            attributes : [
              ['id','tag_id'],
              ['tg_uuid','id'],
              ['tg_title','title'],
            ]
        }).then( async data => {
            helper.successHandler( res, { message : 'Tag List!', payload : data } ); 
        }).catch(err => {
          helper.errorHandler( res, { message : err } );
        });
    } else {
        helper.errorHandler( res );
    }
};


module.exports = tags;