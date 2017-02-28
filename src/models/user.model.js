/**
 * Created by archheretic on 28.02.17.
 */
let fs = require('fs');
let path = require('path');
let _ = require('underscore');

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
            let pos = data.users.length;
            data.users[pos] = { "name": name };
            users = JSON.stringify(data);
            writeToFile(users);

            callback({"Message": "Name " + name + " Added"});
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

            if(JSON.stringify(oldUsers) === newUsers) {
                return;
            }
            newUsers = JSON.parse(newUsers);
            //newUsers = concatArraysUnique(oldUsers, newUsers);
            let result = _.map(oldUsers, function(orig){
                return _.extend(orig, _.findWhere(newUsers, {name: orig.name}));
            });
            writeToFile(JSON.stringify(result));
        })
    }
};

module.exports = user;



function writeToFile(users) {
    fs.writeFile(usersPath, users, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file users.json was saved!");
    });
}
