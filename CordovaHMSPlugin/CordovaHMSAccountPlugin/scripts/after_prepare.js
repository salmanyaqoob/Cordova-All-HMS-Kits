#!/usr/bin/env node

'use strict';

/**
 * This hook makes sure projects using [cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase)
 * will build properly and have the required key files copied to the proper destinations when the app is build on Ionic Cloud using the package command.
 * Credits: https://github.com/arnesson.
 */
var fs = require('fs');
var path = require('path');
var utilities = require("./lib/utilities");

var config = fs.readFileSync('config.xml').toString();
var name = utilities.getValue(config, 'name');

var ANDROID_DIR = 'platforms/android';

var PLATFORM = {
  ANDROID: {
    dest: [
      ANDROID_DIR + '/app/agconnect-services.json'
    ],
    src: [
      'agconnect-services.json'
    ],
  }
};

module.exports = function (context) {
  //get platform from the context supplied by cordova
  var platforms = context.opts.platforms;
  // Copy key files to their platform specific folders
  if (platforms.indexOf('android') !== -1 && utilities.directoryExists(ANDROID_DIR)) {
    console.log('Preparing HMS Account Kit on Android');
    utilities.copyKey(PLATFORM.ANDROID);
  }
};