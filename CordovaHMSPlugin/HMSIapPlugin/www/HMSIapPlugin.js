var exec = require('cordova/exec');

exports.isIapSupported = function (arg0, success, error) {
    exec(success, error, 'HMSIapPlugin', 'isIapSupported', [arg0]);
};

exports.getProductDetails = function (arg0, success, error) {
    exec(success, error, 'HMSIapPlugin', 'getProductDetails', [arg0]);
};

exports.initPurchase = function (arg0, success, error) {
    exec(success, error, 'HMSIapPlugin', 'initPurchase', [arg0]);
};