cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.huawei.cordovahmsaccountplugin.CordovaHMSAccountPlugin",
      "file": "plugins/com.huawei.cordovahmsaccountplugin/www/CordovaHMSAccountPlugin.js",
      "pluginId": "com.huawei.cordovahmsaccountplugin",
      "clobbers": [
        "cordova.plugins.CordovaHMSAccountPlugin"
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
      "id": "cordova-plugin-x-toast.Toast",
      "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
      "pluginId": "cordova-plugin-x-toast",
      "clobbers": [
        "window.plugins.toast"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "com.huawei.cordovahmslocationplugin.CordovaHMSLocationPlugin",
      "file": "plugins/com.huawei.cordovahmslocationplugin/www/CordovaHMSLocationPlugin.js",
      "pluginId": "com.huawei.cordovahmslocationplugin",
      "clobbers": [
        "cordova.plugins.CordovaHMSLocationPlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "com.huawei.cordovahmsaccountplugin": "1.0.0",
    "com.huawei.cordovahmsgmscheckplugin": "1.0.0",
    "cordova-plugin-browsersync-gen2": "1.1.7",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-x-toast": "2.7.2",
    "cordova-plugin-dialogs": "2.0.2",
    "com.huawei.cordovahmslocationplugin": "1.0.0"
  };
});