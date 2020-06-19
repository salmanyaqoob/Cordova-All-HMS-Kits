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
const getId = (id) => document.getElementById(id);
var app = {
  initialized: false,
  hmsAvailable: false,
  gmsAvailable: false,
  locationLog: "",
  pushLog: "",
  accountlog: "",
  analyticslog: "",
  sitelog: "",
  // Initialize an ad object
  ad: {
    gender: 0,
    nonPersonalizedAd: 0,
  },
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
    // this.isGmsAvailable();
    // this.isHmsAvailable();

    // Comming Soon
    document.getElementById("iapOpen").onclick = app.makeDialog;
    // document.getElementById("scanKitOpen").onclick = app.makeDialog;

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

    // Account
    // app.SignInByIdToken;
    // app.SignInByAuthCode;
    // app.SignOut;
    // app.RevokeAuth;

    // HiAnalytics
    // app.LogEvent;

    // document.getElementById("enterPms").onclick = app.EnterPms;

    // this.initSite();
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

  initSite: function () {
    //Initialize service
    var config = {
      apiKey:
        "CV79g/usw+tvbIqzY5vC+/nCVNBwrTlUYWkOLj/90qZUtv2v6qjgBFkO+VrbpcAVCpTL/iH0qX5MXjnA6gDPLQRj090q",
    };
    app.sitelog = "";
    document.getElementById("sitelog").innerHTML = app.sitelog;
    HMSSite.initializeService(
      config,
      function () {
        console.log("Service is initialized successfully");
        app.sitelog =
          app.sitelog +
          app.appendP("Service is initialized successfully", "success");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      },
      function (err) {
        console.log("Error : " + err);
        app.sitelog =
          app.sitelog + app.appendP("Error : " + JSON.stringify(err), "error");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      }
    );
  },

  onTextSearch: function () {
    var siteText = document.getElementById("site_search").value;
    // location: {
    //   lat: 48.893478,
    //   lng: 2.334595,
    // },
    var textSearchReq = {
      query: JSON.stringify(siteText),
      // location: {
      //   lat: 48.893478,
      //   lng: 2.334595,
      // },
      radius: 5000,
      poiType: HMSSite.LocationType.ADDRESS,
      countryCode: "SA",
      language: "en",
      pageIndex: 1,
      pageSize: 5,
    };
    HMSSite.textSearch(
      textSearchReq,
      function (res) {
        console.log(JSON.stringify(res));
        app.sitelog = app.sitelog + app.appendP(JSON.stringify(res), "normal");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      },
      function (err) {
        console.error(JSON.stringify(err));
        app.sitelog =
          app.sitelog + app.appendP("Error : " + JSON.stringify(err), "error");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      }
    );
  },

  onDetailSearch: function () {
    var detailSearchReq = {
      siteId: "16DA89C6962A36CB1752A343ED48B78A",
      language: "fr",
    };
    HMSSite.detailSearch(
      detailSearchReq,
      function (res) {
        console.log(JSON.stringify(res));
        app.sitelog = app.sitelog + app.appendP(JSON.stringify(res), "normal");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      },
      function (err) {
        console.error(JSON.stringify(err));
        app.sitelog =
          app.sitelog + app.appendP("Error : " + JSON.stringify(err), "error");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      }
    );
  },

  onQuerySuggestion: function () {
    var siteText = document.getElementById("site_search").value;
    var querySuggestionReq = {
      query: JSON.stringify(siteText),
      // location: {
      //   lat: 48.893478,
      //   lng: 2.334595,
      // },
      poiTypes: [HMSSite.LocationType.ADDRESS, HMSSite.LocationType.GEOCODE],
      radius: 1000,
      countryCode: "SA",
      language: "en",
    };
    HMSSite.querySuggestion(
      querySuggestionReq,
      function (res) {
        console.log(JSON.stringify(res));
        app.sitelog = app.sitelog + app.appendP(JSON.stringify(res), "normal");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      },
      function (err) {
        console.error(JSON.stringify(err));
        app.sitelog =
          app.sitelog + app.appendP("Error : " + JSON.stringify(err), "error");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      }
    );
  },

  onNearbySearch: function () {
    var siteText = document.getElementById("site_search").value;
    var nearbySearchReq = {
      query: JSON.stringify(siteText),
      location: {
        lat: 24.613374,
        lng: 46.728183,
      },
      radius: 5000,
      poiType: HMSSite.LocationType.ADDRESS,
      countryCode: "SA",
      language: "en",
      pageIndex: 1,
      pageSize: 5,
    };
    HMSSite.nearbySearch(
      nearbySearchReq,
      function (res) {
        console.log(JSON.stringify(res));
        app.sitelog = app.sitelog + app.appendP(JSON.stringify(res), "normal");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      },
      function (err) {
        console.error(JSON.stringify(err));
        app.sitelog =
          app.sitelog + app.appendP("Error : " + JSON.stringify(err), "error");
        document.getElementById("sitelog").innerHTML = app.sitelog;
      }
    );
  },

  initAds: async function () {
    // Initialize cordova.plugins.HMSAds
    await cordova.plugins.HMSAds.init({
      bannerFloat: false,
    });
    app.loadOptions();
  },

  loadOptions: function () {
    // Load colors
    Object.keys(cordova.plugins.HMSAds.Colors).forEach((color) => {
      const opt = document.createElement("option");
      opt.value = cordova.plugins.HMSAds.Colors[color];
      opt.innerHTML = color;
      if (color === "TRANSPARENT") {
        opt.selected = true;
      }
      getId("bannerAdBgColor").appendChild(opt);
      getId("splashLogoColor").appendChild(opt.cloneNode(true));
    });

    // Load banner sizes
    Object.getOwnPropertyNames(cordova.plugins.HMSAds).forEach((constant) => {
      if (constant.startsWith("BANNER_SIZE")) {
        const opt = document.createElement("option");
        opt.value = cordova.plugins.HMSAds[constant];
        opt.innerHTML = constant.replace("BANNER_SIZE_", "");
        if (constant.endsWith("320_50")) {
          opt.selected = true;
        }
        getId("bannerAdSize").appendChild(opt);
      }
    });
  },

  makeDialog: function () {
    window.plugins.toast.showWithOptions({
      message: "Coming Soon",
      duration: "short",
      position: "bottom",
    });
  },

  // Check GMS Available
  isGmsAvailableFn: {
    isGmsAvailable: function (success, failure) {
      cordova.plugins.CordovaHMSGMSCheckPlugin.isGmsAvailable(
        "index.js",
        (_res) => {
          var gmsAvailable = _res === "true";
          this.gmsAvailable = gmsAvailable;
          success(gmsAvailable);
        },
        (_err) => {
          failure(_err);
        }
      );
    },
  },

  // Check HMS Available
  isHmsAvailableFn: {
    isHmsAvailable: function (success, failure) {
      cordova.plugins.CordovaHMSGMSCheckPlugin.isHmsAvailable(
        "index.js",
        (_res) => {
          var hmsAvailable = _res === "true";
          this.hmsAvailable = hmsAvailable;
          success(hmsAvailable);
        },
        (_err) => {
          failure(_err);
        }
      );
    },
  },

  RequestLocation: function () {
    console.log("RequestLocation");
    try {
      app.locationLog =
        app.locationLog + this.appendP("Location update", "heading");
      cordova.plugins.CordovaHMSLocationPlugin.requestLocation(
        "index.js",
        (_res) => {
          app.locationLog = app.locationLog + this.appendP(_res, "normal");
          document.getElementById("locationlog").innerHTML = app.locationLog;
        },
        (_err) => {
          app.locationLog = app.locationLog + this.appendP(_err, "error");
          document.getElementById("locationlog").innerHTML = app.locationLog;
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  Getlastlocation: function () {
    console.log("Getlastlocation");
    try {
      app.locationLog =
        app.locationLog + this.appendP("Last Location", "heading");
      cordova.plugins.CordovaHMSLocationPlugin.getLastlocation(
        "index.js",
        (_res) => {
          app.locationLog = app.locationLog + this.appendP(_res, "normal");
          document.getElementById("locationlog").innerHTML = app.locationLog;
        },
        (_err) => {
          app.locationLog = app.locationLog + this.appendP(_err, "error");
          document.getElementById("locationlog").innerHTML = app.locationLog;
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
          app.locationLog =
            app.locationLog +
            this.appendP("Location remove: " + _res, "normal");
          document.getElementById("locationlog").innerHTML = app.locationLog;
        },
        (_err) => {
          app.locationLog =
            app.locationLog + this.appendP("Remove Fali" + _err, "error");
          document.getElementById("locationlog").innerHTML = app.locationLog;
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
          app.pushLog =
            app.pushLog + this.appendP("Data Message Callback", "heading");

          app.pushLog = app.pushLog + this.appendP(_res, "heading");

          document.getElementById("pushlog").innerHTML = app.pushLog;
        },
        (_err) => {
          app.pushLog = app.pushLog + this.appendP(_err, "error");
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
          app.pushLog =
            app.pushLog + this.appendP("Get Token Successfully", "success");

          app.pushLog =
            app.pushLog + this.appendP("Push Token : " + _res, "normal");

          document.getElementById("pushlog").innerHTML = app.pushLog;
        },
        (_err) => {
          app.pushLog =
            app.pushLog + this.appendP("Get Token Fail: " + _err, "error");
          document.getElementById("pushlog").innerHTML = app.pushLog;
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  TopicSubscribe: function (topic) {
    console.log("TopicSubscribe");
    try {
      cordova.plugins.CordovaHMSPushPlugin.subscribeTopic(
        topic,
        (_res) => {
          app.pushLog =
            app.pushLog +
            this.appendP("Topic subcription Successfully", "success");

          app.pushLog = app.pushLog + this.appendP(_res, "normal");

          document.getElementById("pushlog").innerHTML = app.pushLog;
        },
        (_err) => {
          app.pushLog =
            app.pushLog +
            this.appendP("Topic subcription Fail:" + _err, "error");
          document.getElementById("pushlog").innerHTML = app.pushLog;
        }
      );
    } catch (_e) {
      alert("error");
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  SignInByIdToken: function () {
    console.log("SignInByIdToken");
    try {
      cordova.plugins.CordovaHMSAccountPlugin.signInWithIdToken(
        "index.js",
        (_res) => {
          app.accountlog =
            app.accountlog + this.appendP("Sign Successfully", "success");
          app.accountlog = app.accountlog + this.appendP(_res, "normal");
          document.getElementById("accountlog").innerHTML = app.accountlog;
        },
        (_err) => {
          app.accountlog = app.accountlog + this.appendP(_err, "error");
          document.getElementById("accountlog").innerHTML = app.accountlog;
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  SignInByAuthCode: function () {
    console.log("SignInByAuthCode");
    try {
      cordova.plugins.CordovaHMSAccountPlugin.signInWithAuthCode(
        "index.js",
        (_res) => {
          app.accountlog =
            app.accountlog + this.appendP("Sign Successfully", "success");
          app.accountlog = app.accountlog + this.appendP(_res, "normal");
          document.getElementById("accountlog").innerHTML = app.accountlog;
        },
        (_err) => {
          app.accountlog = app.accountlog + this.appendP(_err, "error") + "\n";
          document.getElementById("accountlog").innerHTML = app.accountlog;
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  SignOut: function () {
    console.log("SignOut");
    try {
      cordova.plugins.CordovaHMSAccountPlugin.signOut(
        "index.js",
        (_res) => {
          app.accountlog =
            app.accountlog + this.appendP("Signout Successfully", "success");
          app.accountlog = app.accountlog + this.appendP(_res, "normal");
          document.getElementById("accountlog").innerHTML = app.accountlog;
        },
        (_err) => {
          app.accountlog = app.accountlog + this.appendP(_err, "error");
          document.getElementById("accountlog").innerHTML = app.accountlog;
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  RevokeAuth: function () {
    console.log("RevokeAuth");
    try {
      cordova.plugins.CordovaHMSAccountPlugin.revokeAuth(
        "index.js",
        (_res) => {
          app.accountlog = app.accountlog + this.appendP(_res, "success");
          document.getElementById("accountlog").innerHTML = app.accountlog;
        },
        (_err) => {
          app.accountlog = app.accountlog + this.appendP(_err, "error");
          document.getElementById("accountlog").innerHTML = app.accountlog;
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  LogEvent: function () {
    console.log("LogEvent Analytics");
    try {
      var message = { uProp: "testAccount", time: "2020", page: "Analytics" };
      cordova.plugins.HMSAnalyticsPlugin.logEvent(
        message,
        (_res) => {
          app.analyticslog =
            app.analyticslog +
            this.appendP("Event log Successfully", "success");
          app.analyticslog = app.analyticslog + this.appendP(_res, "normal");
          document.getElementById("analyticslog").innerHTML = app.analyticslog;
        },
        (_err) => {
          app.analyticslog = app.analyticslog + this.appendP(_err, "error");
          document.getElementById("analyticslog").innerHTML = app.analyticslog;
        }
      );
    } catch (_e) {
      alert(JSON.stringify(_e, "\n", 4));
    }
  },

  appendP: function (text, pClass) {
    return "<p class='" + pClass + "'>" + text + "</p>";
  },

  promisify: (f) => (...a) => new Promise((res, rej) => f(...a, res, rej)),

  // // Check HMS Available
  // isHmsAvailable: function () {
  //   console.log("checkHMS");
  //   try {
  //     cordova.plugins.CordovaHMSGMSCheckPlugin.isHmsAvailable(
  //       "index.js",
  //       (_res) => {
  //         this.hmsAvailable = _res === "true";
  //       },
  //       (_err) => {
  //         alert(_err);
  //       }
  //     );
  //   } catch (_e) {
  //     alert(JSON.stringify(_e, "\n", 4));
  //   }
  // },

  // // Check GMS Available
  // isGmsAvailable: function () {
  //   console.log("checkGMS");
  //   try {
  //     cordova.plugins.CordovaHMSGMSCheckPlugin.isGmsAvailable(
  //       "index.js",
  //       (_res) => {
  //         this.gmsAvailable = _res === "true";
  //       },
  //       (_err) => {
  //         alert(_err);
  //       }
  //     );
  //   } catch (_e) {
  //     alert(JSON.stringify(_e, "\n", 4));
  //   }
  // },

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
};

app.initialize();
