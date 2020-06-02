cordova.define("com.huawei.analyticsplugin.HMSAnalyticsPlugin", function(require, exports, module) { var exec = require("cordova/exec");

exports.logEvent = function (arg0, success, error) {
  exec(success, error, "HMSAnalyticsPlugin", "logEvent", [arg0]);
};

});
