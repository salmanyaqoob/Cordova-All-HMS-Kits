var exec = require('cordova/exec');

exports.requestLocation = function (arg0, success, error) {
    exec(success, error, "CordovaHMSLocationPlugin", "requestLocation", [arg0]);
};

exports.removeLocation = function (arg0, success, error) {
    exec(success, error, "CordovaHMSLocationPlugin", "removeLocation", [arg0]);
};

exports.getLastlocation = function (arg0, success, error) {
    exec(success, error, "CordovaHMSLocationPlugin", "getLastlocation", [arg0]);
};