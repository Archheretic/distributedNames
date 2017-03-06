/**
 * Created by archheretic on 28.02.17.
 */
let express = require('express');
let router = express.Router();
let User = require('../models/user.model');

router.get('/', function(req, res) {
    User.getUsers( (result) => {// (err, users) =>{
        res.json(result);
    });
});

router.post('/', function(req, res) {
    User.addUser(req.body, (status) => {
        res.json(status);
    });
});

module.exports = router;