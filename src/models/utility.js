/**
 * Created by archheretic on 28.02.17.
 */
let fs = require('fs');

let utility = {
    writeToFile: function(path, content, callback) {
        fs.writeFile(path, content, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file " + path + " was saved!");
        });
        if (callback) {
            callback();
        }
    }

};

module.exports = utility;