# Cordova All HMS Kits

In this repository we try to combine all **HMS Cordova Kits** in one Project!

Cordova HMS packages integrated in this project:

1.  **HMS / GMS Availability Checker.**

2.  **HMS Location Kit.**

3.  **Huawei Map.**

4.  **HMS Push Kit.**

5.  **Huawei Analytics Kit.**

6.  **Huawei Account Kit.**

7.  **HMS In App Purchase Kit.** (Coming Soon)

8.  **HMS Site Kit.** (Coming Soon)

## Screenshots

### Application

![enter image description here](./screenshots/Cordova-All-HMS-Kits.gif)

### Screenshots

![enter image description here](./screenshots/1.jpg)

![enter image description here](./screenshots/2.jpg)

![enter image description here](./screenshots/3.jpg)

![enter image description here](./screenshots/4.jpg)

![enter image description here](./screenshots/5.jpg)

![enter image description here](./screenshots/6.jpg)

![enter image description here](./screenshots/7.jpg)

## Project Guide

### How to create custom Cordova Plugin

#### Install plugman library globally

    npm install plugman -g

#### create custom plugin through plugman

    plugman create --name CordovaHMSPushPlugin --plugin_id com.huawei.cordovahmspushplugin --plugin_version 1.0.0

#### Add android platfrom to plugin

    plugman platform add --platform_name android

#### Add package.json file to plugin

    plugman createpackagejson

#### Add plugin to project

    cordova plugin add ./CordovaPuligns/CordovaHMSPushPlugin/ --link

### Install plugins to Project

    cordova plugin add .\CordovaHMSPlugin\CordovaHMSGMSCheckPlugin
    cordova plugin add .\CordovaHMSPlugin\CordovaHMSGMSCheckPlugin
    cordova plugin add .\CordovaHMSPlugin\CordovaHMSLocationPlugin
    cordova plugin add .\CordovaHMSPlugin\cordovaHmsPushPlugin
    cordova plugin add .\CordovaHMSPlugin\CordovaHMSAccountPlugin
    cordova plugin add .\CordovaHMSPlugin\HMSAnalyticsPlugin

### Remove plugins from Project

    cordova plugin remove com.huawei.cordovahmsgmscheckplugin
    cordova plugin remove com.huawei.cordovahmspushplugin
    cordova plugin remove com.huawei.analyticsplugin

### Run Application on HMS Device

    cordova run android --release -- --buildConfig=build.json
    cordova run android --debug -- --buildConfig=build.json

## Official HMS Resources

### Huawei Map Kit:

#### Codelab:[https://developer.huawei.com/consumer/en/codelab/HMSMapKit/index.html#0](https://developer.huawei.com/consumer/en/codelab/HMSMapKit/index.html#0)

#### Document:[https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/hms-map-v4-abouttheservice](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/hms-map-v4-abouttheservice)

### Huawei Location Kit:

#### Codelab: [https://developer.huawei.com/consumer/en/codelab/HMSLocationKit/index.html#0](https://developer.huawei.com/consumer/en/codelab/HMSLocationKit/index.html#0)

#### Document: [https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/location-introduction](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/location-introduction)

### Push Kit:

#### Codelab: [https://developer.huawei.com/consumer/en/codelab/HMSPushKit/index.html#0](https://developer.huawei.com/consumer/en/codelab/HMSPushKit/index.html#0)

#### Document: [https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/push-introduction](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/push-introduction)

#### Push Kit Server Side code SDK:

**Supporting Language** (Java, C#, Python, GoLang, PHP, Node.js)

[https://developer.huawei.com/consumer/en/doc/development/HMS-Examples/push-serverjavasdk](https://developer.huawei.com/consumer/en/doc/development/HMS-Examples/push-serverjavasdk)

### Analytics Kit:

#### Codelab: [https://developer.huawei.com/consumer/en/codelab/HMSAnalyticsKit-ReactNative/index.html#0](https://developer.huawei.com/consumer/en/codelab/HMSAnalyticsKit-ReactNative/index.html#0)

#### Document: [https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/react-native-development](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/react-native-development)

## Note:

This article and repository will update frequently upon new HMS Kits compatibility with Cordova framework.
