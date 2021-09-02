
const Joi = require('joi');
//const { addTags } = require('../controller/tags');
//const { updateProfile } = require('../controller/users');
//const { createPoolCluster } = require('mysql2');

// accepts name only as letters and converts to uppercase
const name = Joi.string().regex(/^[A-Z]+$/).uppercase();

// accepts a valid UUID v4 string as id
const personID = Joi.string().guid({version: 'uuidv4'});

// accepts ages greater than 6
// value could be in one of these forms: 15, '15', '15y', '15yr', '15yrs'
// all string ages will be replaced to strip off non-digits
// const ageSchema = Joi.alternatives().try([
//     Joi.number().integer().greater(6).required(),
//     Joi.string().replace(/^([7-9]|[1-9]\d+)(y|yr|yrs)?$/i, '$1').required()
// ]);

const personDataSchema = Joi.object().keys({
    id: personID.required(),
    firstname: name,
    lastname: name,
    fullname: Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase(),
    type: Joi.string().valid('STUDENT', 'TEACHER').uppercase().required(),
    //sex: Joi.string().valid(['M', 'F', 'MALE', 'FEMALE']).uppercase().required(),

    // if type is STUDENT, then age is required
    // age: Joi.when('type', {
    //     is: 'STUDENT',
    //     //then: ageSchema.required(),
    //     //otherwise: ageSchema
    // })
})

// must have only one between firstname and lastname
.xor('firstname', 'fullname')

// firstname and lastname must always appear together
.and('firstname', 'lastname')

// firstname and lastname cannot appear together with fullname
.without('fullname', ['firstname', 'lastname']);

// password and confirmPassword must contain the same value
const authDataSchema = Joi.object({
    teacherId: personID.required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).required().strict(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
});

// cardNumber must be a valid Luhn number
const feesDataSchema = Joi.object({
    studentId: personID.required(),
    amount: Joi.number().positive().greater(1).precision(2).required(),
    cardNumber: Joi.string().creditCard().required(),
    completedAt: Joi.date().timestamp().required()
});



// Admin login validation
let adminLogin = Joi.object({
    name           : Joi.string().min(3).max(99),
    password       : Joi.string().required(),
    //password       : Joi.string().regex(/^\S*$/).min(8).max(20).strict(),
});


let signUp = Joi.object({
    //name           : Joi.string().min(3).max(99).required(),
    email          : Joi.string().email().min(3).max(99).required(),
    //password       : Joi.string().regex(/^\S*$/).min(8).max(30).strict().required(),
	// device_id : Joi.string().required(),
    // device_token : Joi.string().required(),
    // device_platform : Joi.string().required(),
});




let verifyOTP = Joi.object({
    id : Joi.string().required(),
    otp           : Joi.number().required(),
    email          : Joi.string().email().min(3).max(99).required(),
    //password       : Joi.string().regex(/^\S*$/).min(8).max(30).strict().required(),
	device_id : Joi.string().required(),
    device_token : Joi.string().required(),
    device_platform : Joi.string().required(),
});


// login validation
let login = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
    device_id : Joi.string().required(),
    device_token : Joi.string().required(),
    device_platform : Joi.string().required(),
});


let socialLogin = Joi.object({
	id : Joi.string().required(),
	username  : Joi.string().required(),
    email : Joi.string().email().required(),
	//gender : Joi.any(),
	//image : Joi.any(),
	paltform : Joi.string().required(),
    //password : Joi.string().required(),
    device_id : Joi.string().required(),
    device_token : Joi.string().required(),
    device_platform : Joi.string().required(),
});

let forgotPassword = Joi.object({
    email      : Joi.string().email().min(3).max(99).required(),
});



let verifyForgotPassword = Joi.object({
	id : Joi.string().required(),
	email : Joi.string().email().min(3).max(99).required(),
    otp : Joi.string().required(),
});

let setPassword = Joi.object({
	id : Joi.string().required(),
	otp  : Joi.string().required(),
    password : Joi.string().required(),
});


let changePassword = Joi.object({
    password     : Joi.string().required(),
    newpassword  : Joi.string().regex(/^\S*$/).min(8).max(30).strict().required(),
});


let updateProfile = Joi.object({
    //image     : Joi.string().required(),
    username     : Joi.string().required(),
    mobile  : Joi.any(),
    //fullname  : Joi.string().required(),
    email : Joi.any(),
    //password : Joi.string().regex(/^\S*$/).min(8).max(30).strict().required(),
    password : Joi.any(),
});


let addTags = Joi.object({
    tags     : Joi.string().required(),
});


let likeImage = Joi.object({
    id     : Joi.string().required(),
});



module.exports = {
    '/api/signup'     : signUp,
    '/api/verify-otp' : verifyOTP,
    '/api/login'          : login,
	'/api/social-login'   : socialLogin,
	'/api/set-password'  : setPassword,
    '/api/forgot-password' : forgotPassword,
	'/api/verify-forgot-password' : verifyForgotPassword,
	
    '/api/change-password' : changePassword,

    '/api/update-profile' : updateProfile,

    '/api/tags'         : addTags,

    '/api/like-image' : likeImage,


    //Admin apis
    '/login'              : adminLogin,
};