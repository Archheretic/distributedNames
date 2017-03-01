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
    Node.getNodes( (err, nodes) =>{
        if (nodes)
            res.json(nodes);
        else
            res.json({err});
    });
});

router.post('/', function(req, res) {
    Node.CheckAndAdd( (status) =>{
        res.json(status);
    });
});

module.exports = router;