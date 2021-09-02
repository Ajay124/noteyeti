const accountSid = 'AC8d5206f864f4845b2d115a30b52602d5';  //ajay
const authToken = 'cde122a2a4441960a8760a2723400b84'; //ajay

//const twilio = require('twilio');

const client = require('twilio')(accountSid, authToken);

//const twilioNumber = '+17165375043'; //ajay
const twilioNumber = '+13239924021'; //ajay

let twilioLib = {};

twilioLib.sendSMS = (body) => {
    console.log('you are in twilio', body);
    /*client.calls.each(function(call) {
        console.log('calling',call);
      });*/

    client.messages.create({
        body : body.message,
        to : '+12163547758',
        from : twilioNumber
    })
    .then((message) => {
        console.log('message goes here',message )
        if ( message && message.sid ) {
            console.log(message.sid)
            return true;
        }
        else {
            console.log('error in sending message')
            return false;
        }
    }).catch(err => {
        console.log('errror goes here',err);
    });
}

module.exports = twilioLib;
