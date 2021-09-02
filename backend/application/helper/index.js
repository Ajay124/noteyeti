const nodemailer = require('nodemailer');
let constant     = require('../config/constant');
let jwt			 = require('jsonwebtoken');
let helper       = {};

helper.successHandler = function ( res, options = {} ) {
    status = '';
    if ( options.status == false ) {
        status = options.status;
    } else {
        status = true;
    }
    
    let obj = {
        status 	: status,
        //base_url: constant.BASE_URL+'/',
        //code 	: (options && options.code) || "",
        message : (options && options.message) || 'Operation performed successfully',
        payload :  (options && options.payload) || {}
    }
    res.send(obj);
}

/**
 * 
 * @param: 
 * @returns:
 * @developer :  Ajay
 */
helper.errorHandler = function ( res, options = {}, httpStatuCode = 501 ) {
    status = '';
    if ( options.status == '' ) {
        status = options.status;
    } else {
        status = true;
    }
    let obj = {
        status 	:  status || false,
        //code 	:  (options && options.code) || "",
        message :  (options && options.message) || 'Something went wrong.',
        payload :  (options && options.payload) || {}
    }
    res.status(httpStatuCode).json(obj);
}


helper.sendMail = (req) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'papzi.help@gmail.com',
          pass: 'HT)TnrxG6B~<]4!v'
        }
    });
	
	/*let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        //secure: true,
        auth: {
            user: 'papzi.help@gmail.com',
            pass: 'HT)TnrxG6B~<]4!v'
        }
    });*/
    let from = req.from ? req.from : 'papzi.help@gmail.com';
    let mailOptions = {
        from: from,
        to: req.to,
        subject: req.subject,
        html: req.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('error sending mail',error);
        } else {
          console.log('Email sent: ' + info.response);
        }
		return true;
    });
}


helper.getTokenDetail = function( req ) {
    let token       = '';
    let response    = '';
    if ( req ) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            token = req.query.token;
        } else {
            token = req.body.token || req.query.token || req.headers['x-access-token'];
        }
    }
    if ( token && token != '' && token != 'undefined') {
        console.log('token',token);
        jwt.verify(token, constant.secret, function(err, decoded) {
            if (err) {
                console.log('err',err);
                return false;
            } else {
                response = decoded;
                // pool.query('SELECT * FROM user WHERE u_active = ? AND u_deleted = ? AND u_id = ?', [ '1', '0',uid ], function ( error, results, fields ) {
                //     if ( error ) {
                //         return false
                //     } else {
                //         if (results && results.length > 0) {
                //             console.log("results",uid)
        
                //             return uid;
                //         } else {
                //             console.log("3")
                //             return false
                //         }
                //     }
                // });
            }
        });
    }
    return response;
}

helper.get_user_age = function( dateString ) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

helper.contactUs = async ( req, res ) => {
    helper.sendMail({
        from : req.body.email,
        to : constant.SITE_EMAIL,
        //to : 'ajay4msuja@gmail.com',
        subject : req.body.subject,
        message : req.body.message
      });
      helper.successHandler( res, { message : 'Email sent successfully!.' } );
}

module.exports = helper;