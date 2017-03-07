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
                //console.log("data.users[i] " + JSON.stringify(data.users[i])  + " name " + JSON.stringify(name));
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
            console.log("newUsers ", newUsers);
            if(JSON.stringify(oldUsers) === newUsers) {
                return;
            }
            newUsers = JSON.parse(newUsers);
            let oldCount =  oldUsers.users.length;
            let result = merge(newUsers, oldUsers);

            console.log("result ", JSON.stringify(result));
            if (oldCount === result.users.length) {
                return;
            }
            //newUsers.users = newUsers;
            utility.writeToFile(usersPath, JSON.stringify(result));
        })
    }
};

module.exports = user;

// basicly same method inn node.model.js, should be put out in a seperate file to avoid code duplicity
function merge(newUsers, oldUsers) {
    let unique;
    let newList = [];
    let pos;
    for (let i = 0; i < newUsers.users.length; i++) {
        unique = true;
        for (let j = 0; j < oldUsers.users.length; j++) {
            // console.log("newNodeList.nodes[i] === oldNodeList.nodes[j]");
            //console.log(JSON.stringify(newNodeList.nodes[i])  + " " + JSON.stringify(oldNodeList.nodes[j]));
            if (JSON.stringify(newUsers.users[i]) == JSON.stringify(oldUsers.users[j])) {
                unique = false;

                ///console.log(unique);
                break;
            }
        }
        if (unique) {
            //console.log("newNodeList.nodes[i] ", newNodeList.nodes[i]);
            pos = newList.length;
            newList[pos] = newUsers.users[i];
        }
    }
    for (let i = 0; i < newList.length; i++) {
        pos = oldUsers.users.length;
        //console.log("newList[i] ", newList[i]);
        oldUsers.users[pos] = newList[i];
    }
    return oldUsers;
}