cordova.define("com.huawei.cordovahmspushplugin.CordovaHMSPushPlugin", function(require, exports, module) {
var exec = require("cordova/exec");

exports.getToken = function (arg0, success, error) {
  exec(success, error, "CordovaHMSPushPlugin", "getToken", [arg0]);
};

exports.getMessageCallback = function (arg0, success, error) {
  exec(success, error, "CordovaHMSPushPlugin", "getMessageCallback", [arg0]);
};

exports.subscribeTopic = function (arg0, success, error) {
  exec(success, error, "CordovaHMSPushPlugin", "subscribeTopic", [arg0]);
};

});
