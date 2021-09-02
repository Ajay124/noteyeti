
let helper          = require('../helper/index');
//let adminModel      = require('../models').admins;
let userModel      = require('../models').users;
let notesModel      = require('../models').notes;
let imagesModel      = require('../models').notes_images;
let tagsModel      = require('../models').notes_tags;
let tasksModel      = require('../models').notes_tasks;

let tagModel      = require('../models').tags;

const q           = require('q');

let uuidv1        = require('uuid').v1;
const path 				= require('path');
const fs 				= require('fs');

var multer  = require('multer');

let constant        = require('../config/constant');
const { Op } = require("sequelize");
const sequelize = require("sequelize");
//const { Op, QueryTypes  } = require("sequelize");
let notes = {};

var template_path = './uploads';

var storage = multer.diskStorage({
	destination: template_path,
	filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `image-${Date.now()}.${ext}`);
      }
});


notes.addNotes = async (req, res) => {
    let userDetail = helper.getTokenDetail(req);
    if ( userDetail ) {
        let insertData = {
            n_uuid : uuidv1(Date.now()),
            n_fk_u_id : userDetail.id,
        };

        if ( req.body.title ) {
            insertData.n_title = req.body.title;
        }
        if ( req.body.description ) {
            insertData.n_description = req.body.description;
        }
        if ( req.body.reminder ) {
            insertData.n_reminder = req.body.reminder;
        }

        notesModel.create(insertData).then( async data => {
            if( data ) {
                if ( req.body.images && req.body.images != '' ) {
                    let images = JSON.parse(req.body.images);
                    if ( images.length > 0 ) {
                        await notes.addImages(images, data.get('id'));
                    }
                }

                if ( req.body.tags && req.body.tags != '' ) {
                    let tags = JSON.parse(req.body.tags);
                    if ( tags.length > 0 ) {
                        await notes.addtags(tags, data.get('id'));
                    }
                }

                if ( req.body.tasks && req.body.tasks != '' ) {
                    let tasks = JSON.parse(req.body.tasks);
                    if ( tasks.length > 0 ) {
                        await notes.addtasks(tasks, data.get('id'));
                    }
                }

                notesModel.findOne({
                    where : {
                        id : data.get('id')
                    },
                    include: [{
						model: imagesModel,
                        as : 'notes_images',
					},
                    // {
					// 	model: tagsModel,
                    //     as : 'notes_tags'
					// },
                    {
                        model: tagsModel,
                        as : 'notes_tags',
                        //required : false,
                        //where : wheretags,
                        include: [
                           { model : tagModel }
                        ]
                    },
                    {
						model: tasksModel,
                        as : 'notes_tasks'
					}],
                }).then( resul => {
                    console.log('you are here');
                    helper.successHandler( res, { message : 'Success', payload : resul } );
                }).catch(err => {
                    helper.errorHandler( res, { message : err } );
                });
            } else {
                helper.errorHandler( res );
            }
        }).catch(err => {
            helper.errorHandler( res, { message : err } );
        });
    } else {
      helper.errorHandler( res );
    }
}

notes.addImages  = ( images, id ) => {
    let deferred = q.defer();
    for (const img of images) {
        let insertData = {
            ni_uuid : uuidv1(Date.now()),
            ni_url : img.url,
            ni_fk_n_id : id,
        };
        imagesModel.create(insertData);
    }
    deferred.resolve(true);
    return deferred.promise;
}

notes.addtags  = async ( tags, id ) => {
    let deferred = q.defer();
    await (q.all(tags.map( async function(tag) {
        let resu = await tagModel.findOne({
            where : {
                tg_uuid : tag.id
            }
        });
        tag.id = resu.id;
        let insertData = {
            nt_uuid : uuidv1(Date.now()),
            nt_fk_tg_id : tag.id,
            nt_fk_n_id : id,
        };
        await tagsModel.create(insertData);
    })));
    
    deferred.resolve(true);
    return deferred.promise;
}

notes.addtasks  = async ( tasks, id ) => {
    let deferred = q.defer();
    /*for (const task of tasks) {
        let insertData = {
            nta_uuid : uuidv1(Date.now()),
            nta_title : task.title,
            nta_fk_n_id : id,
            nta_ischecked : '0'
        };
        tasksModel.create(insertData);
    }*/
    await (q.all(tasks.map( async function(task) {
        let insertData = {
            nta_uuid : uuidv1(Date.now()),
            nta_title : task.title,
            nta_fk_n_id : id,
            nta_ischecked : task.ischecked
        };
        await tasksModel.create(insertData);
    })));
    deferred.resolve(true);
    return deferred.promise;
}


notes.updateTag  = ( tag, id ) => {
    let updateData = {
        tg_title : tag.title,
    };
    notesModel.update(
        updateData,
        { returning: true, where: { tg_uuid : tag.id, tg_fk_u_id : id  } }
    );
}

notes.archiveNotes = async (req, res) => {
	let userDetail = helper.getTokenDetail(req);
    console.log('req.body',req.body);
	if ( userDetail ) {
        //if ( req.params.id ) {
        if ( req.body.ids &&  req.body.ids.length > 0 ) {
            await req.body.ids.map(async (index)=>{
                console.log('index',index);
                let ifexist = await notesModel.findOne({
                    where : {
                        n_uuid : index,
                    }
                });
                if ( ifexist ) {
                    if ( ifexist.n_isarchive == '1' ) {
                        notesModel.update(
                            { n_isarchive : '0' },
                            { returning: true, where: { id : ifexist.id  }}
                        ).then( async data => {
                            //helper.successHandler( res, { message : 'Removed from archive' } );
                        }).catch(err => {
                            helper.errorHandler( res, { message : err } );
                        });
                    } else {
                        notesModel.update(
                            { n_isarchive : '1' },
                            { returning: true, where: { id : ifexist.id  }}
                        ).then( async data => {
                            //helper.successHandler( res, { message : 'Added to archive' } );
                        }).catch(err => {
                            helper.errorHandler( res, { message : err } );
                        });
                    }
                } 
            });
            helper.successHandler( res, { message : 'Action perfomed successfully' } );
            // let ifexist = await notesModel.findOne({
            //     where : {
            //         n_uuid : req.params.id,
            //     }
            // }); 
            // if ( ifexist ) {
            //     if ( ifexist.n_isarchive == '1' ) {
            //         notesModel.update(
            //             { n_isarchive : '0' },
            //             { returning: true, where: { id : ifexist.id  }}
            //         ).then( async data => {
            //             helper.successHandler( res, { message : 'Removed from archive' } );
            //         }).catch(err => {
            //             helper.errorHandler( res, { message : err } );
            //         });
            //     } else {
            //         notesModel.update(
            //             { n_isarchive : '1' },
            //             { returning: true, where: { id : ifexist.id  }}
            //         ).then( async data => {
            //             helper.successHandler( res, { message : 'Added to archive' } );
            //         }).catch(err => {
            //             helper.errorHandler( res, { message : err } );
            //         });
            //     }
            // } else {
            //     helper.errorHandler( res );
            // }
        } else {
            helper.errorHandler( res );
        }
	} else {
		helper.successHandler( res, { sataus : false, message : 'You are at wrong place.' } );
	}
};

notes.findAll = async (req , res) => {
    let userDetail = helper.getTokenDetail(req);
    if ( userDetail ) {
        let where = {
            n_fk_u_id : userDetail.id
        };


        let wheretags = {};
        let tagModelrequired = false;
        if ( req.body.tags ) {
            let ids = JSON.parse(req.body.tags);
            if ( ids.length > 0 ) {
                wheretags.nt_fk_tg_id = { 
                  [Op.in] : ids
                };
                tagModelrequired = true;
            }
            //where.wp_fk_cat_id = req.body.cat_id;
        }

        if( req.body.title ) {
          where.n_title = {
            [Op.like]: '%'+req.body.title+'%'
          }
        }

        let order = [
            [ 'id', 'DESC' ]
        ];

        if( req.body.sort ) {
            let sorting = JSON.parse(req.body.sort);
            if ( sorting ) {
                order = [
                    [ sorting.type , sorting.order ]
                ]
            }
            
        }


        if( req.body.isarchive ) {
            where.n_isarchive = req.body.isarchive
          }

        let total_count = await notesModel.findAll({
            where : where,
            include: [
                {
                    model: tagsModel,
                    as : 'notes_tags',
                    required : tagModelrequired,
                    where : wheretags
                },
            ],
        });

        console.log('total_count',total_count.length);

        let per_page = req.body.per_page ? req.body.per_page : 10,
            total_records = total_count.length,
            page = req.body.page ? req.body.page : 0,
            offset = page * per_page;
        notesModel.findAll({
            where : where,
            order : order,
            include: [
                {
                    model: imagesModel,
                    as : 'notes_images',
                    required : false,
                },
                {
                    model: tagsModel,
                    as : 'notes_tags',
                    required : tagModelrequired,
                    where : wheretags,
                    include: [
                       { model : tagModel }
                    ]
                },
                {
                    model: tasksModel,
                    as : 'notes_tasks',
                    required : false,
                }
            ],
            offset: offset,
            limit: per_page,
        }).then( async data => {
            helper.successHandler( res, { message : 'Notes List!', payload : { data : data, per_page : per_page, total_records : total_records, page_number : parseInt(page), total_pages : Math.ceil( total_records/per_page ) } } ); 
        }).catch(err => {
            console.log(err);
            helper.errorHandler( res, { message : err } );
        });
    } else {
        helper.errorHandler( res );
    }
};


notes.update = async (req, res) => {
    console.log('req.body',req.body);
    let userDetail = helper.getTokenDetail(req);
    if ( userDetail ) {
        if ( req.params.id ) {
            let ifexist = await notesModel.findOne({
                where : {
                    n_uuid : req.params.id,
                }
            }); 
            if ( ifexist ) {
                let updateData = {};
        
                // if ( req.body.title ) {
                //     updateData.n_title = req.body.title;
                // }
                // if ( req.body.description ) {
                //     updateData.n_description = req.body.description;
                // }
                if ( req.body.reminder == '' ) {
                    updateData.n_reminder = null;
                } else {
                    updateData.n_reminder = req.body.reminder;
                }

                updateData.n_title = req.body.title;
                updateData.n_description = req.body.description;
                
        
                notesModel.update(
                    updateData,
                    { returning: true, where: { id : ifexist.id  } }
                ).then( async data => {
                    if( data ) {
                        if ( req.body.images && req.body.images != '' ) {
                            let images = JSON.parse(req.body.images);
                            if ( images.length > 0 ) {
                                await notes.deleteImages(ifexist.id);
                                await notes.addImages(images, ifexist.id);
                            } else {
                                await notes.deleteImages(ifexist.id);
                            }
                        } 
        
                        if ( req.body.tags && req.body.tags != '' ) {
                            let tags = JSON.parse(req.body.tags);
                            if ( tags.length > 0 ) {
                                await notes.deletetags(ifexist.id);
                                await notes.addtags(tags, ifexist.id);
                            } else {
                                await notes.deletetags(ifexist.id);
                            }
                        }
        
                        if ( req.body.tasks && req.body.tasks != '' ) {
                            let tasks = JSON.parse(req.body.tasks);
                            if ( tasks.length > 0 ) {
                                await notes.deletetasks(ifexist.id);
                                await notes.addtasks(tasks, ifexist.id);
                            } else {
                                await notes.deletetasks(ifexist.id);
                            }
                        }
        
                        notesModel.findOne({
                            where : {
                                id : ifexist.id
                            },
                            include: [{
                                model: imagesModel,
                                as : 'notes_images'
                            },
                            {
                                model: tagsModel,
                                as : 'notes_tags',
                                include: [
                                    { model : tagModel }
                                ]
                            },
                            {
                                model: tasksModel,
                                as : 'notes_tasks'
                            }],
                        }).then( resul => {
                            console.log('you are here');
                            helper.successHandler( res, { message : 'Success', payload : resul } );
                        }).catch(err => {
                            helper.errorHandler( res, { message : err } );
                        });
                    } else {
                        helper.errorHandler( res );
                    }
                }).catch(err => {
                    console.log('err',err)
                    helper.errorHandler( res, { message : err } );
                });
            } else {
                helper.errorHandler( res );
            }
        }
    } else {
      helper.errorHandler( res );
    }
}

notes.deleteImages  = async ( id ) => {
    let deferred = q.defer();
    await imagesModel.destroy({
        where : {
            ni_fk_n_id : id,
        }
    });
    deferred.resolve(true);
    return deferred.promise;
}

notes.deletetags  = async ( id ) => {
    let deferred = q.defer();
    await tagsModel.destroy({
        where : {
            nt_fk_n_id : id,
        }
    });
    deferred.resolve(true);
    return deferred.promise;
}

notes.deletetasks  = async ( id ) => {
    let deferred = q.defer();
    await tasksModel.destroy({
        where : {
            nta_fk_n_id : id,
        }
    });
    deferred.resolve(true);
    return deferred.promise;
}

notes.delete = async (req, res) => {
    console.log('req.bidt',req.body);
    let userDetail = helper.getTokenDetail(req);
    if ( userDetail ) {
        if ( req.body.ids &&  req.body.ids.length > 0 ) {
            await req.body.ids.map(async (index)=>{
                let ifexist = await notesModel.findOne({
                    where : {
                        n_uuid : index,
                    }
                });

                if ( ifexist ) {
                    await notes.deleteImages(ifexist.id);
                    await notes.deletetags(ifexist.id);
                    await notes.deletetasks(ifexist.id);
                    notesModel.destroy({
                        where : {
                            n_uuid : index,
                            n_fk_u_id : userDetail.id
                        }
                    });
                    // .then(data => {
                    //     if ( data ) {
                    //         //helper.successHandler( res, { message : 'Note deleted successfully!.' } );
                    //     } else {
                    //        // helper.errorHandler( res );
                    //     }
                    // }).catch(err => {
                    //     console.log('err',err);
                    //     //helper.errorHandler( res, { message : err } );
                    // });
                }
            });
            helper.successHandler( res, { message : 'Action perfomed successfully' } );
        } else {
            helper.errorHandler( res );
        }
    } else {
        helper.errorHandler( res );
    }
};


module.exports = notes;