var exec = require('cordova/exec');

exports.signInWithIdToken = function (arg0, success, error) {
    exec(success, error, "CordovaHMSAccountPlugin", "signInWithIdToken", [arg0]);
};

exports.signInWithAuthCode = function (arg0, success, error) {
    exec(success, error, "CordovaHMSAccountPlugin", "signInWithAuthCode", [arg0]);
};

exports.signOut = function (arg0, success, error) {
    exec(success, error, "CordovaHMSAccountPlugin", "signOut", [arg0]);
};

exports.revokeAuth = function (arg0, success, error) {
    exec(success, error, "CordovaHMSAccountPlugin", "revokeAuth", [arg0]);
};