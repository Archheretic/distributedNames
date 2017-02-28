/**
 * Created by archheretic on 28.02.17.
 */
/**
 * Created by archheretic on 28.02.17.
 */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

let nodesPath = path.join(__dirname, '..', 'storage', 'nodes.json');
//let jsonString = fs.readFileSync(namesPath, 'utf8');

router.get('/', function(req, res) {
    let obj;
    fs.readFile(nodesPath, 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log(obj);
        res.json(obj);
    });

});

module.exports = router;