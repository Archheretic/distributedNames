/**
 * Created by archheretic on 28.02.17.
 */
let path = require('path');
let namesPath = path.join(__dirname, 'storage', 'users.json');
let nodesPath = path.join(__dirname, 'storage', 'nodes.json');
let fs = require('fs');

var https = require('http');



let pullMaster = {
    start: function() {
      pullNames();
    //  this.pullNodes();

    }

};

module.exports = pullMaster;

function pullNames() {
    console.log("It has been six seconds!");
    let obj;
    fs.readFile(nodesPath, 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        let ip;
        let port;
        for (let i = 0, len = obj.nodes.length; i < len; i++) {
            console.log(obj.nodes[i]);
            ip = obj.nodes[i].ip;
            port = obj.nodes[i].port;
            doGetRequest(ip, port);
        }
    });
    setTimeout(pullNames,6000);
}


function doGetRequest(ip, port) {
    let optionsget = {
        host : ip,
        port : port,
        path : '/api/users',
        method : 'GET'
    };
    let reqGET = https.get(optionsget, function(res) {
       // console.log("statusCode: ", res.statusCode);
       // console.log("headers: ", res.headers);
        res.on('data', function(d) {
       //     console.info('GET result:\n');
            process.stdout.write(d);

         //   console.info('\n\nCall completed');
        });
    });
    reqGET.end();
    reqGET.on('error', function(e) {
        console.error(e);
    });
}

