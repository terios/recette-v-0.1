'use strict';

var express = require('express'),
    app = express(),
    http = require('http'),
    mongoose = require('mongoose'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash');
;

//require('./api/services/passport')(passport);


//setting mongodb url and connecting
var dbConfig = require('./dbConfig.js');
mongoose.connect(dbConfig.url);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


app.use(session({
    secret: 'kloklokloklo',
    name: 'kasd',
    proxy: true,
    resave: true,
    cookie: { secure: true },
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session


require('./api/services/passport')(passport);

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)

//serve angularJS file from /app
app.use(express.static('./app'));

// Bootstrap models

//services route

//create http server liston on 3000
var httpServer = http.createServer(app);

var io = require('socket.io').listen(httpServer);


require('./routes/route')(app, passport);

httpServer.listen(3000);

console.log('Express http server started on http://127.0.0.1:3000/  ');

module.exports = app;