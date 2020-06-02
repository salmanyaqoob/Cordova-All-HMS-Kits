cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
        "id": "cordova-plugin-x-toast.Toast",
        "pluginId": "cordova-plugin-x-toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/com.huawei.cordovahmsaccountplugin/www/CordovaHMSAccountPlugin.js",
        "id": "com.huawei.cordovahmsaccountplugin.CordovaHMSAccountPlugin",
        "pluginId": "com.huawei.cordovahmsaccountplugin",
        "clobbers": [
            "cordova.plugins.CordovaHMSAccountPlugin"
        ]
    },
    {
        "file": "plugins/com.huawei.cordovahmsgmscheckplugin/www/CordovaHMSGMSCheckPlugin.js",
        "id": "com.huawei.cordovahmsgmscheckplugin.CordovaHMSGMSCheckPlugin",
        "pluginId": "com.huawei.cordovahmsgmscheckplugin",
        "clobbers": [
            "cordova.plugins.CordovaHMSGMSCheckPlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/browser/notification.js",
        "id": "cordova-plugin-dialogs.notification_browser",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/com.huawei.cordovahmslocationplugin/www/CordovaHMSLocationPlugin.js",
        "id": "com.huawei.cordovahmslocationplugin.CordovaHMSLocationPlugin",
        "pluginId": "com.huawei.cordovahmslocationplugin",
        "clobbers": [
            "cordova.plugins.CordovaHMSLocationPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-x-toast": "2.7.2",
    "cordova-plugin-browsersync-gen2": "1.1.7",
    "com.huawei.cordovahmsaccountplugin": "1.0.0",
    "com.huawei.cordovahmsgmscheckplugin": "1.0.0",
    "cordova-plugin-dialogs": "2.0.2",
    "com.huawei.cordovahmslocationplugin": "1.0.0"
}
// BOTTOM OF METADATA
});