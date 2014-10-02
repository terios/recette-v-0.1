var express = require('express'),
    app = express(),
    http = require('http'),
    mongoose = require('mongoose'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

//require('./api/services/passport')(passport);


//setting mongodb url and connecting
var mongo_uri = 'localhost';
var mongo_db = 'recette';
var db = mongoose.connect('mongodb://' + mongo_uri + '/' + mongo_db);

//bodyparser to fetch params from requests


app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)

//serve angularJS file from /app
app.use(express.static('./app'));

// Bootstrap models

//services route

//create http server liston on 3000
var httpServer = http.createServer(app);

var io = require('socket.io').listen(httpServer);


require('./routes/route')(app);

httpServer.listen(3000);

console.log('Express http server started on http://127.0.0.1:3000/  ');

module.exports = app;