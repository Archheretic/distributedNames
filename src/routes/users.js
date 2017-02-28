/**
 * Created by archheretic on 28.02.17.
 */
let express = require('express');
let router = express.Router();
let User = require('../models/user.model');

router.get('/', function(req, res) {
    User.getUsers( (err, users) =>{
        if (users)
            res.json(users);
        else
            res.json({err});
    });
});

router.post('/', function(req, res) {
    User.addUser(req.body.name, (status) => {
        res.json(status);
    });
});

module.exports = router;