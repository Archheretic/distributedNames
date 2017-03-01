/**
 * Created by archheretic on 28.02.17.
 */
let fs = require('fs');
let path = require('path');
let _ = require('underscore');
let utility = require('./utility');
let nodesPath = path.join(__dirname, '..', 'storage', 'nodes.json');
let http = require('http');
//let jsonString = fs.readFileSync(namesPath, 'utf8');



let node = {
    getNodes: function (callback) {
        fs.readFile(nodesPath, 'utf8', function (err, data) {
            if (err) throw err;
            let nodes = JSON.parse(data);
            callback(nodes);
        });
    },

    /**
     * Checks the if the the newNodeList is the same as the old, if not the node lists gets merged without adding
     * duplicates.
     */
    CheckAndMerge: function(newNodeList, callback) {
        this.getNodes( (oldNodeList, err) => {
            if (err) {
                console.log(err);
            }
            if (JSON.stringify(oldNodeList) === newNodeList) {
                return;
            }

            newNodeList = JSON.parse(newNodeList);

            let result = merge(newNodeList, oldNodeList);


            result = { "nodes": result};
            console.log(result);

            utility.writeToFile(nodesPath, JSON.stringify(result));
        })
    },

    /**
     * Checks if this node is part of the list, if not, it will add it self to the list and send a post request
     * with its own information to the other systems.
     * */
    CheckAndAdd: function(node, callback) {
        this.getNodes( (oldNodeList, err) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < oldNodeList.nodes.length; i++) {
                // console.log(JSON.stringify(oldNodeList.nodes[i]));
                // console.log(JSON.stringify(node));
                // console.log(JSON.stringify(oldNodeList.nodes[i]) == JSON.stringify(node));
                if (JSON.stringify(oldNodeList.nodes[i]) == JSON.stringify(node)) {
                    if (callback) {
                        callback("node already exist");
                    }
                    else {
                        return; // not unique
                    }
                }
            }
            let pos = oldNodeList.nodes.length;
            oldNodeList.nodes[pos] = node;
            //console.log(oldNodeList);
            utility.writeToFile(nodesPath, JSON.stringify(oldNodeList));
            for(let i = 0; i < oldNodeList.nodes.length; i++) {
                 sendNodeInfo(node, oldNodeList.nodes[i]);
            }
            if (callback) {
                callback("new node added"); //litt fusk
            }
        })
    },
};

module.exports = node;


function merge(newNodeList, oldNodeList) {
    let unique;
    let newList = [];
    for (let i = 0; i < newNodeList.nodes.length; i++) {
        unique = true;
        for (let j = 0; j < oldNodeList.nodes.length; j++) {
           // console.log("newNodeList.nodes[i] === oldNodeList.nodes[j]");
            //console.log(JSON.stringify(newNodeList.nodes[i])  + " " + JSON.stringify(oldNodeList.nodes[j]));
            if (newNodeList.nodes[i] === oldNodeList.nodes[j]) {
                unique = false;
                break;
            }
        }
        if (unique) {
            newList[i] = newNodeList.nodes[i];
        }
    }
    return newList;
}

// function sendNodeInfo(node, receiver) {
//     let adress = receiver.ip + ":" + receiver.port;
//     console.log(adress);
//     request.post({url:adress, formData: JSON.stringify(node)}, function optionalCallback(err, httpResponse, body) {
//         if (err) {
//             return console.error('upload failed:', err);
//         }
//         console.log('Upload successful!  Server responded with:', body);
//     });
//     /*
//     request({
//         url: receiver.ip + ":" + receiver.port,
//         method: "POST",
//         json: true,
//         headers: {
//             "content-type": "application/json",
//         },
//         body: JSON.stringify(node)
//     }, function (error, response, body) {
//         if (!error && response.statusCode === 200) {
//             console.log(body)
//         }
//         else {
//             console.log("error: " + error)
//             console.log("response.statusCode: " + response.statusCode)
//             console.log("response.statusText: " + response.statusText)
//         }
//     })
//     */
// }

function sendNodeInfo(node, receiver) {

    node = JSON.stringify(node);
    // An object of options to indicate where to post to
    let post_options = {
        host: node.ip,
        port: node.port,
        path: '/api/nodes',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(node)
        }
    };

    // Set up the request
    let post_req = http.request(post_options, function(res) {

        res.setEncoding('utf8');
        /*
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
        */
    });

    // post the data
    post_req.write(node);
    post_req.end();

    post_req.on('error', function(e) {
        //  Will get a lot of errors due to bad recursive logic
        //  console.error(e);
    });

}