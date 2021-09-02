const _ = require('lodash');
const Joi = require('joi');
//console.log('Joi',Joi);
const Schemas = require('../helper/validator_schema');
module.exports = (useJoiError = false) => {
    // useJoiError determines if we should respond with the base Joi error
    // boolean: defaults to false
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'put', 'get'];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };

    return (req, res, next) => {
        const route = req.route.path;
        const method = req.method.toLowerCase();
        
        if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
            const _schema = _.get(Schemas, route);

            if (_schema) {
                console.log('requested body', req.body);
                const validation = _schema.validate(req.body);
                if ( validation.error ) {
                    let strmsg = validation.error.details[0].message;
                    let _err = {
                        "status": false,
                        "message": strmsg.replace(/\"/g,''),
                        "payload": {}
                    }
                    res.send(_err);
                } else {
                    next();
                } 
            }
        }
    };
};