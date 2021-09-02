//const commonModel = require("../models/index");
module.exports.authenticate = function(req, res, next) {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    } else {
        token = req.body.token || req.query.token || req.headers['x-access-token'];
    }
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};


/*module.exports.authenticateAdmin = async function(req, res, next) {
    if ( req.headers.authorization && req.headers.authorization != 'undefined' ) {
        console.log('req.headers.authorization',req.headers.authorization);
        let userDetail = await commonModel.getRowIdAll(req.headers.authorization, 'u_token', 'users' );
        console.log('userDetail',userDetail);
        if  ( userDetail ) {
            next();
        }
    } else { 
        console.log('you are in else');
        res.status(400).end();
    }
    
};*/


module.exports.allowHeaders = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');

    if (req.method == 'OPTIONS') {
        //console.log('headers option working');
        res.status(200).end();
    } else { 
        //console.log('headers goint working');
        next();
    }
};



