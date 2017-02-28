/**
 * Created by archheretic on 03.02.17.
 */
/* jshint node: true */
"use strict";
// External dependencies
let express = require("express");
let bodyParser = require("body-parser");
let morgan = require("morgan");
// Our files
let users = require("./routes/users");
let nodes = require("./routes/nodes");
let app = express();
let path = require("path");
let pullMaster = require("./pullMaster");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// logs requests to the console.
app.use(morgan("dev"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/users', users);
app.use('/api/nodes', nodes);


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/views/home.html'));
});

/*
app.get('/', function(req, res) {
    res.render(index);
});
*/
app.listen(3000);
console.log("Server is listening to port 3000");

pullMaster.start();

module.exports = app;