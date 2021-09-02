process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");

//const cookieParser	    = require('cookie-parser');
const helmet			= require('helmet');
const jwt			    = require('jsonwebtoken');

//const bodyParser = require("body-parser");





const cors = require("cors");
const api = require('./application/routes/api');
const web = require('./application/routes/web');
//const socket = require('./application/routes/socket');

const app = express();

app.set('port', process.env.PORT || 3007);

global.app = app;       
global.jwt = jwt;


var corsOptions = {
  origin: "*"
};



app.use("/uploads", express.static(__dirname + '/uploads'));
app.use("/uploads/profile_image", express.static(__dirname + '/uploads/profile_image'));


//app.use(cookieParser());
app.use(helmet.hidePoweredBy());

app.use(helmet.frameguard());
app.use(helmet.xssFilter());

app.use(cors(corsOptions));
app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Yeti application." });
});

// set port, listen for requests
// const PORT = process.env.PORT || 3001;
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}.`);
});



//const http = require('http').createServer(app);
//const io = require('socket.io')(http);
//global.io  = io;
//global.http= http;
//socket.init( app, io );
//http.listen(app.get('port'));



//console.log('after',app.get('port') );

api.init( app, jwt );
web.init( app );


