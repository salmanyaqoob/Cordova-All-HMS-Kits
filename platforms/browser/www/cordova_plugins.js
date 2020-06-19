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
        "file": "plugins/com.huawei.cordovahmslocationplugin/www/CordovaHMSLocationPlugin.js",
        "id": "com.huawei.cordovahmslocationplugin.CordovaHMSLocationPlugin",
        "pluginId": "com.huawei.cordovahmslocationplugin",
        "clobbers": [
            "cordova.plugins.CordovaHMSLocationPlugin"
        ]
    },
    {
        "file": "plugins/com.huawei.cordovahmspushplugin/www/CordovaHMSPushPlugin.js",
        "id": "com.huawei.cordovahmspushplugin.CordovaHMSPushPlugin",
        "pluginId": "com.huawei.cordovahmspushplugin",
        "clobbers": [
            "cordova.plugins.CordovaHMSPushPlugin"
        ]
    },
    {
        "file": "plugins/com.huawei.analyticsplugin/www/HMSAnalyticsPlugin.js",
        "id": "com.huawei.analyticsplugin.HMSAnalyticsPlugin",
        "pluginId": "com.huawei.analyticsplugin",
        "clobbers": [
            "cordova.plugins.HMSAnalyticsPlugin"
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
        "file": "plugins/com.huawei.cordovahmsaccountplugin/www/CordovaHMSAccountPlugin.js",
        "id": "com.huawei.cordovahmsaccountplugin.CordovaHMSAccountPlugin",
        "pluginId": "com.huawei.cordovahmsaccountplugin",
        "clobbers": [
            "cordova.plugins.CordovaHMSAccountPlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-hms-site/www/HMSSite.js",
        "id": "cordova-plugin-hms-site.cordova-plugin-hms-site",
        "pluginId": "cordova-plugin-hms-site",
        "clobbers": [
            "HMSSite"
        ]
    },
    {
        "file": "plugins/cordova-plugin-hms-ads/www/utils.js",
        "id": "cordova-plugin-hms-ads.utils",
        "pluginId": "cordova-plugin-hms-ads"
    },
    {
        "file": "plugins/cordova-plugin-hms-ads/www/HMSAds.js",
        "id": "cordova-plugin-hms-ads.HMSAds",
        "pluginId": "cordova-plugin-hms-ads",
        "clobbers": [
            "HMSAds"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-x-toast": "2.7.2",
    "cordova-plugin-browsersync-gen2": "1.1.7",
    "com.huawei.cordovahmslocationplugin": "1.0.0",
    "com.huawei.cordovahmspushplugin": "1.0.0",
    "com.huawei.analyticsplugin": "1.0.0",
    "com.huawei.cordovahmsgmscheckplugin": "1.0.0",
    "com.huawei.cordovahmsaccountplugin": "1.0.0",
    "cordova-plugin-hms-site": "4.0.4",
    "cordova-plugin-hms-ads": "4.0.4"
}
// BOTTOM OF METADATA
});