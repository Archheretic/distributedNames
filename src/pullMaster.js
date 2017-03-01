/**
 * Created by archheretic on 28.02.17.
 */
let path = require('path');
let namesPath = path.join(__dirname, 'storage', 'users.json');
let nodesPath = path.join(__dirname, 'storage', 'nodes.json');
let fs = require('fs');
let User = require('./models/user.model');
let Node = require('./models/node.model');
let https = require('http');

let minPort = 8000;
let maxPort = 8999;

let pullMaster = {
    start: function() {
      pullNames();
    //  this.pullNodes();
    }
};

module.exports = pullMaster;

function pullNames() {
    console.log("It has been six seconds!");
    fs.readFile(nodesPath, 'utf8', function (err, data) {
        if (err) throw err;
        let obj = JSON.parse(data);
        let ip;
        let port;
        for (let i = 0, len = obj.nodes.length; i < len; i++) {
            //console.log(obj.nodes[i]);
            ip = obj.nodes[i].ip;
            port = obj.nodes[i].port;
     // if we go back to ports
    //        for (let port = 0; port < ports.length; port++)
    //        {
            doGetUsersRequest(ip, port);
     //       }
            portScan(ip);
        }
    });
    setTimeout(pullNames,6000);
}

function doGetUsersRequest(ip, port) {
    let optionsget = {
        host : ip,
        port : port,
        path : '/api/users',
        method : 'GET'
    };
    let reqGET = https.get(optionsget, function(res) {
       // console.log("statusCode: ", res.statusCode);
       // console.log("headers: ", res.headers);

        if (res.statusCode === 200) {
            res.on('data', function (users) {
                //     console.info('GET result:\n');
                //process.stdout.write(users);
                //console.log("");
                users = users.toString();
                User.CheckAndAdd(users);
                //   console.info('\n\nCall completed');
            });
        }
    });
    reqGET.end();

    reqGET.on('error', function(e) {
        //  Will get a lot of errors due to servers/nodes going down.
        //  console.error(e);
    });

}

/**
 * Scans a range of ports of a spesific IP to look after similar systems. If found it will pull down the adress.
 */
function portScan(ip) {

    let port = minPort;
    while(port <= maxPort) {
        let optionsget = {
            host : ip,
            port : port,
            path : '/api/nodes',
            method : 'GET'
        };

        let reqGET = https.get(optionsget, function(res) {
            //console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);
            if (res.statusCode === 200) {
                res.on('data', function(nodes) {
                    //     console.info('GET result:\n');
                    process.stdout.write(nodes);
                    console.log('');
                    Node.CheckAndMerge(nodes);
                    //   console.info('\n\nCall completed');
                });
            }
        });
        reqGET.end();

        reqGET.on('error', function(e) {
            //  Will get a lot of errors due to servers/nodes going down.
            //  console.error(e);
        });
        port++;
    }
}
