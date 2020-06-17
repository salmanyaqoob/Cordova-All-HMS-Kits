cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-x-toast.Toast",
      "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
      "pluginId": "cordova-plugin-x-toast",
      "clobbers": [
        "window.plugins.toast"
      ]
    },
    {
      "id": "com.huawei.cordovahmslocationplugin.CordovaHMSLocationPlugin",
      "file": "plugins/com.huawei.cordovahmslocationplugin/www/CordovaHMSLocationPlugin.js",
      "pluginId": "com.huawei.cordovahmslocationplugin",
      "clobbers": [
        "cordova.plugins.CordovaHMSLocationPlugin"
      ]
    },
    {
      "id": "com.huawei.cordovahmspushplugin.CordovaHMSPushPlugin",
      "file": "plugins/com.huawei.cordovahmspushplugin/www/CordovaHMSPushPlugin.js",
      "pluginId": "com.huawei.cordovahmspushplugin",
      "clobbers": [
        "cordova.plugins.CordovaHMSPushPlugin"
      ]
    },
    {
      "id": "com.huawei.analyticsplugin.HMSAnalyticsPlugin",
      "file": "plugins/com.huawei.analyticsplugin/www/HMSAnalyticsPlugin.js",
      "pluginId": "com.huawei.analyticsplugin",
      "clobbers": [
        "cordova.plugins.HMSAnalyticsPlugin"
      ]
    },
    {
      "id": "com.huawei.cordovahmsgmscheckplugin.CordovaHMSGMSCheckPlugin",
      "file": "plugins/com.huawei.cordovahmsgmscheckplugin/www/CordovaHMSGMSCheckPlugin.js",
      "pluginId": "com.huawei.cordovahmsgmscheckplugin",
      "clobbers": [
        "cordova.plugins.CordovaHMSGMSCheckPlugin"
      ]
    },
    {
      "id": "com.huawei.cordovahmsaccountplugin.CordovaHMSAccountPlugin",
      "file": "plugins/com.huawei.cordovahmsaccountplugin/www/CordovaHMSAccountPlugin.js",
      "pluginId": "com.huawei.cordovahmsaccountplugin",
      "clobbers": [
        "cordova.plugins.CordovaHMSAccountPlugin"
      ]
    },
    {
      "id": "cordova-plugin-hms-site.cordova-plugin-hms-site",
      "file": "plugins/cordova-plugin-hms-site/www/HMSSite.js",
      "pluginId": "cordova-plugin-hms-site",
      "clobbers": [
        "HMSSite"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-browsersync-gen2": "1.1.7",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-x-toast": "2.7.2",
    "com.huawei.cordovahmslocationplugin": "1.0.0",
    "com.huawei.cordovahmspushplugin": "1.0.0",
    "com.huawei.analyticsplugin": "1.0.0",
    "com.huawei.cordovahmsgmscheckplugin": "1.0.0",
    "com.huawei.cordovahmsaccountplugin": "1.0.0",
    "cordova-plugin-hms-site": "4.0.4"
  };
});