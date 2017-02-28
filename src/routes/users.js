/**
 * Created by archheretic on 28.02.17.
 */
let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
    res.json({"users" : '\"name\" : \"Ole\"'});
});

module.exports = router;