const middle = require('../middleware/index');
const SchemaValidator = require('../middleware/schema_validator');
const validateRequest = SchemaValidator(true);
const _auth = require('../controller/auth');
const _user = require('../controller/users');
const _tags = require('../controller/tags');
const _notes = require('../controller/notes');
const _twilio = require('../library/twilio/index');
module.exports.init = ( app, jwt ) => {
    app.post("/api/test", async function(req,res){
        let twilio = await _twilio.sendSMS(
            {
                message : 'noteyeti testing message 123456',
                //to : '+12163547758',
                //from : twilioNumber
            }
        );
        res.send({ message : 'OTP send to your email!.', payload : twilio });
        //helper.successHandler( res, { message : 'OTP send to your email!.', payload : twilio } );
    });
    app.post("/api/signup", validateRequest, _auth.signup  );
    app.post("/api/verify-otp", validateRequest, _auth.verifyOTP  );

    app.post("/api/social-login", validateRequest, _auth.socialLogin);

    app.post("/api/login", validateRequest, _auth.login);
    app.post("/api/forgot-password", validateRequest, _auth.forgotPassword);
    app.post("/api/verify-forgot-password", validateRequest, _auth.verifyForgotPassword);

    app.post("/api/set-password", validateRequest, _auth.setPassword);

    app.all('/api/*', middle.authenticate);

    app.post("/api/update-profile", validateRequest, _user.updateProfile);

    app.post("/api/change-password", validateRequest, _user.changePassword);

    app.post("/api/change-password", validateRequest, _user.changePassword);

    app.post("/api/tags", validateRequest, _tags.addTags);
    app.delete("/api/tags/:id", _tags.delete);
    app.get("/api/tags", _tags.findAll);

    app.post("/api/notes", _notes.addNotes);
    //app.put("/api/archive/:id", _notes.archiveNotes);
    app.put("/api/archive", _notes.archiveNotes);
    // app.delete("/api/notes/:id", _tags.delete);
    app.post("/api/notes-list", _notes.findAll);

    app.put("/api/notes/:id", _notes.update);

    app.delete("/api/notes", _notes.delete);

    app.post('/api/logout', _auth.logout );

    
	
}