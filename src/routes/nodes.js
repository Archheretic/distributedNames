/**
 * Created by archheretic on 28.02.17.
 */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let Node = require('../models/node.model');

let nodesPath = path.join(__dirname, '..', 'storage', 'nodes.json');
//let jsonString = fs.readFileSync(namesPath, 'utf8');

router.get('/', function(req, res) {
    Node.getNodes((err, result) => {
        if (err) {
            res.status(500).send({
                Message: err
            });
        }
        else {
            res.json(result);
        }
    });
});

router.post('/', function(req, res) {
    authenticateNode(req, res, function(req,res) {
        Node.CheckAndAdd(req.body, function(err, result) {
            if (err) {
                res.status(500).send({
                    Message: err
                });
            }
            else {
                res.json(result);
            }
        });
    });
});

module.exports = router;

const http = require('http');
const async = require("async");
function authenticateNode(req, res, callback) {
    console.log(req.body);
    const ip = req.body.ip;
    const port = req.body.port;
    let asyncTasks = [];
    let getListWorking;
    let getNodeWorking;
    asyncTasks.push(function(callback) {
        testGetList(ip, port, function(err, result) {
            getListWorking = result;
            callback();
        });
    });
    asyncTasks.push(function(callback) {
        testGetNodes(ip, port, function(err, result) {
            getNodeWorking = result;
            callback();
        });
    });

    async.parallel(asyncTasks, function(){
        // All tasks are done now
        if (getListWorking && getNodeWorking) {
            callback(req, res);
        }
        else {
            let message = "Following Api endpoint are not following standards:\n";
            if (!getListWorking) {
                message += "GET /list\n";
            }
            if (!getNodeWorking) {
                message += "GET /nodes";
            }
            return res.status(403).send({
                success: false,
                message: message
            });
        }
    });
}

function testGetNodes(ip, port, callback) {
    let optionsget = {
        host : ip,
        port : port,
        path : '/nodes',
        method : 'GET'
    };
    let reqGET = http.get(optionsget, function(res) {
        // console.log("statusCode: ", res.statusCode);
        // console.log("headers: ", res.headers);

        if (res.statusCode === 200) {
            //      console.log(res.statusCode === 200);
            res.on('data', function (nodes) {
                nodes = nodes.toString();
                callback(undefined, nodesValid(nodes));
            });
        }
    });
    reqGET.end();

    reqGET.on('error', function(e) {
        // on error the name validations has failed.
        callback(undefined, false);
    });
}

function testGetList(ip, port, callback) {
    let optionsget = {
        host : ip,
        port : port,
        path : '/list',
        method : 'GET'
    };
    let reqGET = http.get(optionsget, function(res) {
        // console.log("statusCode: ", res.statusCode);
        // console.log("headers: ", res.headers);
        if (res.statusCode === 200) {
            //      console.log(res.statusCode === 200);
            res.on('data', function (users) {
                users = users.toString();
                callback(undefined, usersValid(users));
            });
        }
    });
    reqGET.end();

    reqGET.on('error', function(e) {
        // on error the name validations has failed.
        callback(undefined, false);
    });
}

function usersValid(newUsers) {
    try {
        newUsers = JSON.parse(newUsers);
        for (let i = 0; i < newUsers.length; i++) {
            let user = newUsers.users[i];
            if (typeof user.name !== "string") {
                return false;
            }
        }
        return true;
    }
    catch (err) {
        console.log("Bad integration between distributed systems.\nError msg: ", err);
        return false;
    }
}

function nodesValid(newNodes) {
    try {
        newNodes = JSON.parse(newNodes);
        for (let i = 0; i < newNodes.length; i++) {
            let node = newNodes.nodes[i];
            if (typeof node.ip !== "string") {
                return false;
            }
            if (typeof node.port !== "number") {
                return false;
            }
        }
        return true;
    }
    catch (err) {
        console.log("Bad integration between distributed systems.\nError msg: ", err);
        return false;
    }
}