/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
//   // Cordova is now initialized. Have fun!

//   console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
//   // document.getElementById('deviceready').classList.add('ready');
// }

var app = {
  initialized: false,
  hmsAvailable: false,
  gmsAvailable: false,
  locationLog: "",
  pushLog: "",
  // Application Constructor
  initialize: function () {
    if (this.initialized) return;
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
    this.initialized = true;
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent("deviceready");

    // HMS & GMS Check
    this.isGmsAvailable();
    this.isHmsAvailable();

    // Comming Soon
    document.getElementById("scan-kit").onclick = app.makeDialog;

    // Map
    document.getElementById("openMapView").onclick = function () {
      click_api.openMap();
    };

    // Location
    // app.RequestLocation;
    // app.RemoveLocation;
    // app.Getlastlocation;

    // Push
    // app.GetToken();
    this.SetMessageCallback();

    // Method 1: Active invoking
    // document.getElementById("hms-gms-check").onclick = app.isHmsAvailable;
    // this.GetToken();
    // this.SetMessageCallback();

    // document.getElementById("signInByIdToken").onclick = app.SignInByIdToken;
    // document.getElementById("signInByAuthCode").onclick = app.SignInByAuthCode;
    // document.getElementById("signOut").onclick = app.SignOut;
    // document.getElementById("revokeAuth").onclick = app.RevokeAuth;

    // document.getElementById("logEvent").onclick = app.LogEvent;
    // document.getElementById("enterPms").onclick = app.EnterPms;
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    // var parentElement = document.getElementById(id);
    // var listeningElement = parentElement.querySelector(".listening");
    // var receivedElement = parentElement.querySelector(".received");
    // listeningElement.setAttribute("style", "display:none;");
    // receivedElement.setAttribute("style", "display:block;");
    // console.log("Received Event: " + id);
  },

  makeDialog: function () {
    function alertDismissed() {
      // do something
    }
    navigator.notification.alert(
      "This feature is comming soon.", // message
      alertDismissed, // callback
      "Comming Soon", // title
      "Done" // buttonName
    );
  },

  // Check HMS Available
  isHmsAvailable: function () {
    console.log("checkHMS");
    try {
      cordova.plugins.CordovaHMSGMSCheckPlugin.isHmsAvailable(
        "index.js",
        (_res) => {
          this.hmsAvailable = _res === "true";
        },
        (_err) => {
          alert(_err);
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  // Check GMS Available
  isGmsAvailable: function () {
    console.log("checkGMS");
    try {
      cordova.plugins.CordovaHMSGMSCheckPlugin.isGmsAvailable(
        "index.js",
        (_res) => {
          this.gmsAvailable = _res === "true";
        },
        (_err) => {
          alert(_err);
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  RequestLocation: function () {
    console.log("RequestLocation");
    try {
      cordova.plugins.CordovaHMSLocationPlugin.requestLocation(
        "index.js",
        (_res) => {
          app.locationLog = app.locationLog + _res + "\n";
          document.getElementById("locationlog").innerHTML = app.locationLog;
        },
        (_err) => {
          alert(_err);
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  Getlastlocation: function () {
    console.log("Getlastlocation");
    try {
      cordova.plugins.CordovaHMSLocationPlugin.getLastlocation(
        "index.js",
        (_res) => {
          app.locationLog = "Last Location:" + _res + "\n";
          document.getElementById("locationlog").innerHTML = app.locationLog;
        },
        (_err) => {
          alert("get Fail:" + _err);
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  RemoveLocation: function () {
    console.log("RemoveLocation");
    try {
      cordova.plugins.CordovaHMSLocationPlugin.removeLocation(
        "index.js",
        (_res) => {
          app.locationLog = "Location Remove" + _res + "\n";
          document.getElementById("locationlog").innerHTML = app.locationLog;
        },
        (_err) => {
          alert("remove Fail" + _err);
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  SetMessageCallback: function () {
    console.log("SetMessageCallback");
    try {
      cordova.plugins.CordovaHMSPushPlugin.getMessageCallback(
        "index.js",
        (_res) => {
          app.pushLog = "Message Callback \n" + _res + "\n";
          document.getElementById("pushlog").innerHTML = app.pushLog;
        },
        (_err) => {
          app.pushLog = "message Fail";
          document.getElementById("pushlog").innerHTML = app.pushLog;
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  GetToken: function () {
    console.log("GetToken");
    try {
      cordova.plugins.CordovaHMSPushPlugin.getToken(
        "index.js",
        (_res) => {
          app.pushLog = "Get Token Success. \n Push Token : " + _res + "\n";
          document.getElementById("pushlog").innerHTML = app.pushLog;
        },
        (_err) => {
          app.pushLog = "Get Token Fail: " + _err;
          document.getElementById("pushlog").innerHTML = app.pushLog;
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  TopicSubscribe: function (topic) {
    console.log("TopicSubscribe");
    alert(topic);
    try {
      cordova.plugins.CordovaHMSPushPlugin.subscribeTopic(
        topic,
        (_res) => {
          alert(_res);
          app.pushLog = _res + "\n";
          document.getElementById("pushlog").innerHTML = app.pushLog;
        },
        (_err) => {
          app.pushLog = "Topic subcription Fail: " + _err;
          document.getElementById("pushlog").innerHTML = app.pushLog;
        }
      );
    } catch (_e) {
      alert("error");
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  //   EnterPms: function () {
  //     console.log("CheckIap");
  //     try {
  //       cordova.plugins.HMSIapPlugin.isIapSupported(
  //         "index.js",
  //         (_res) => {
  //           console.log(_res);
  //           click_api.openPMS();
  //         },
  //         (_err) => {
  //           alert(_err);
  //         }
  //       );
  //     } catch (_e) {
  //       alert(JSON.stringify(_e, "\n", 4));
  //     }
  //   },

  //   LogEvent: function () {
  //     console.log("LogEvent");
  //     try {
  //       var message = { uProp: "testAccount", time: "2020", page: "index.html" };
  //       cordova.plugins.HMSAnalyticsPlugin.logEvent(
  //         message,
  //         (_res) => {
  //           alert(_res);
  //         },
  //         (_err) => {
  //           alert(_err);
  //         }
  //       );
  //     } catch (_e) {
  //       alert(JSON.stringify(_e, "\n", 4));
  //     }
  //   },

  //   SignInByIdToken: function () {
  //     console.log("SignInByIdToken");
  //     try {
  //       cordova.plugins.CordovaHMSAccountPlugin.signInWithIdToken(
  //         "index.js",
  //         (_res) => {
  //           alert(_res);
  //         },
  //         (_err) => {
  //           alert(_err);
  //         }
  //       );
  //     } catch (_e) {
  //       alert(JSON.stringify(_e, "\n", 4));
  //     }
  //   },

  //   SignInByAuthCode: function () {
  //     console.log("SignInByAuthCode");
  //     try {
  //       cordova.plugins.CordovaHMSAccountPlugin.signInWithAuthCode(
  //         "index.js",
  //         (_res) => {
  //           alert(_res);
  //         },
  //         (_err) => {
  //           alert(_err);
  //         }
  //       );
  //     } catch (_e) {
  //       alert(JSON.stringify(_e, "\n", 4));
  //     }
  //   },

  //   SignOut: function () {
  //     console.log("SignOut");
  //     try {
  //       cordova.plugins.CordovaHMSAccountPlugin.signOut(
  //         "index.js",
  //         (_res) => {
  //           alert(_res);
  //         },
  //         (_err) => {
  //           alert(_err);
  //         }
  //       );
  //     } catch (_e) {
  //       alert(JSON.stringify(_e, "\n", 4));
  //     }
  //   },

  //   RevokeAuth: function () {
  //     console.log("RevokeAuth");
  //     try {
  //       cordova.plugins.CordovaHMSAccountPlugin.revokeAuth(
  //         "index.js",
  //         (_res) => {
  //           alert(_res);
  //         },
  //         (_err) => {
  //           alert(_err);
  //         }
  //       );
  //     } catch (_e) {
  //       alert(JSON.stringify(_e, "\n", 4));
  //     }
  //   },
};

app.initialize();
