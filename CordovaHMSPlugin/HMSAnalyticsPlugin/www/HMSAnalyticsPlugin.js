var exec = require('cordova/exec');

exports.logEvent = function (arg0, success, error) {
    exec(success, error, 'HMSAnalyticsPlugin', 'log', [arg0]);
};
