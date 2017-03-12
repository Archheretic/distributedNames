/**
 * Created by archheretic on 28.02.17.
 */
let express = require('express');
let router = express.Router();
let User = require('../models/user.model');

router.get('/', function(req, res) {
    User.getUsers( (err, result) => {// (err, users) =>{
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
    User.addUser(req.body, (err, result) => {
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

module.exports = router;