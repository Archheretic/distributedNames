/**
 * Created by archheretic on 28.02.17.
 */
let fs = require('fs');
let path = require('path');
let _ = require('underscore');

let utility = require('./utility');
let usersPath = path.join(__dirname, '..', 'storage', 'users.json');
//let jsonString = fs.readFileSync(namesPath, 'utf8');


let user = {
    getUsers: function (callback) {
        fs.readFile(usersPath, 'utf8', function (err, data) {
            if (err) throw err;
            let users = JSON.parse(data);
            callback(users);
        });
    },

    addUser: function(name, callback) {
        this.getUsers( (data, err) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < data.users.length; i++) {
                console.log("data.users[i] " + JSON.stringify(data.users[i])  + " name " + JSON.stringify(name));
                if (JSON.stringify(data.users[i]) == JSON.stringify(name)) {
                    callback({"Message": "Name " + JSON.stringify(name.name) + " already exist"});
                    return;
                }
            }

            let pos = data.users.length;
            data.users[pos] = name;
            users = JSON.stringify(data);
            utility.writeToFile(usersPath, users);

            callback({"Message": "Name " + JSON.stringify(name.name) + " Added"});
        })
    },

    /**
     * Checks the if the the new User list is the same as the old, if not the user lists gets merged without adding
     * duplicates.
     */
    CheckAndAdd: function(newUsers, callback) {
        this.getUsers( (oldUsers, err) => {
            if (err) {
                console.log(err);
            }

            //console.log(JSON.stringify(oldUsers));
            //console.log(newUsers);
            if(JSON.stringify(oldUsers) === newUsers) {
                return;
            }
            newUsers = JSON.parse(newUsers);
            _.extend(newUsers, oldUsers);
            //console.log(newUsers);
            utility.writeToFile(usersPath, JSON.stringify(newUsers));
        })
    }
};

module.exports = user;
