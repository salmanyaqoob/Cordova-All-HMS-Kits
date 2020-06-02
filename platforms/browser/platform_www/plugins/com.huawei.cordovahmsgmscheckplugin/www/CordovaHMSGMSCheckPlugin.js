cordova.define("com.huawei.cordovahmsgmscheckplugin.CordovaHMSGMSCheckPlugin", function(require, exports, module) { var exec = require("cordova/exec");

exports.isHmsAvailable = function (arg0, success, error) {
  exec(success, error, "CordovaHMSGMSCheckPlugin", "isHmsAvailable", [arg0]);
};

exports.isGmsAvailable = function (arg0, success, error) {
  exec(success, error, "CordovaHMSGMSCheckPlugin", "isGmsAvailable", [arg0]);
};

});
