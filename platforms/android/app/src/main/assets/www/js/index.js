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
const ad = {
  gender: 0,
  nonPersonalizedAd: 0,
};
let nativeAdInstance = null;

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
    await HMSAds.init({
      bannerFloat: false,
    });
    app.loadOptions();
  },

  loadOptions: function () {
    // Load colors
    Object.keys(HMSAds.Colors).forEach((color) => {
      const opt = document.createElement("option");
      opt.value = HMSAds.Colors[color];
      opt.innerHTML = color;
      if (color === "TRANSPARENT") {
        opt.selected = true;
      }
      getId("bannerAdBgColor").appendChild(opt);
      getId("splashLogoColor").appendChild(opt.cloneNode(true));
    });

    // Load banner sizes
    Object.getOwnPropertyNames(HMSAds).forEach((constant) => {
      if (constant.startsWith("BANNER_SIZE")) {
        const opt = document.createElement("option");
        opt.value = HMSAds[constant];
        opt.innerHTML = constant.replace("BANNER_SIZE_", "");
        if (constant.endsWith("320_50")) {
          opt.selected = true;
        }
        getId("bannerAdSize").appendChild(opt);
      }
    });
  },

  // /////////////////////////////////////////////////////
  // SplashAd example
  // /////////////////////////////////////////////////////

  splashAdCreate: async function () {
    const splashAdInstance = new HMSAds.Splash();

    await splashAdInstance.create({
      logo: {
        copyright: "Copyright Huawei 2020",
        owner: "Huawei",
        anchor: getId("splashLogoAnchor").value,
        bg: getId("splashLogoColor").value,
      },
      // audioFocusType: HMSAds.NativeAd.AUDIO_...
      // preload: true|false,
      // adId: "..." // required if preload is true
      // orientation: "..." // required if preload is true
      // ad // required if preload is true
    });

    splashAdInstance.on("loaded", () => {
      splashAdInstance.show();
    });

    // Subscribe the dismissed event here. We simply close the splash ad.
    // You also may want to call destroy, if you won't be using the same
    // splash again.
    splashAdInstance.on("dismissed", () => {
      splashAdInstance.cancel();
      splashAdInstance.destroy();
    });

    splashAdInstance.load({
      ad,
      adId: "testq6zq98hecj",
      orientation: HMSAds.SCREEN_ORIENTATION_PORTRAIT,
    });
  },

  // /////////////////////////////////////////////////////
  // BannerAd example
  // /////////////////////////////////////////////////////

  bannerAdCreate: async function () {
    const bannerAdsInstance = new HMSAds.Banner();

    bannerAdsInstance.on("loaded", () => {
      console.log("bannerAdsInstance :: loaded");
    });
    bannerAdsInstance.on("failed", () => {
      console.log("bannerAdsInstance :: failed");
    });
    bannerAdsInstance.on("closed", () => {
      console.log("bannerAdsInstance :: closed");
    });

    await bannerAdsInstance.create({
      adId: "testw6vs28auh3",
      bannerAdSize: getId("bannerAdSize").value,
      bgColor: getId("bannerAdBgColor").value,
      anchor: getId("bannerAdPosition").value,
      bannerRefresh: 50, // [50-250]
    });

    await bannerAdsInstance.loadAd(ad);
  },

  // /////////////////////////////////////////////////////
  // RewardAd example
  // /////////////////////////////////////////////////////

  rewardAdCreate: async function () {
    const rewardAdsInstance = new HMSAds.Reward();
    await rewardAdsInstance.create({
      adId: "testx9dtjwj8hp",
      // immersive: true|false,
      // data: "...",
      // userId: "..."
      // rewardVerifyConfig: {
      //     data: "...",
      //     userId: "..."
      // }
    });

    // We subscrive the loaded event here, need to do it before
    // calling loadAd function.
    rewardAdsInstance.on("loaded", async () => {
      await rewardAdsInstance.show();
    });

    rewardAdsInstance.loadAd(ad);
  },

  // /////////////////////////////////////////////////////
  // InterstitialAd example
  // /////////////////////////////////////////////////////

  interstitialAdCreate: async function () {
    const interstitialAdInstance = new HMSAds.Interstitial();
    await interstitialAdInstance.create({
      adId: "testb4znbuh3n2",
    });

    // We subscrive the loaded event here, need to do it before
    // calling loadAd function
    interstitialAdInstance.on("loaded", async () => {
      await interstitialAdInstance.show();
    });

    interstitialAdInstance.loadAd(ad);
  },

  // /////////////////////////////////////////////////////
  // NativeAd example
  // /////////////////////////////////////////////////////

  nativeAdCreate: async function () {
    // Remove old ad
    if (nativeAdInstance) {
      await nativeAdInstance.destroy();
    }

    const template = getId("nativeAdTemplate").value;
    const nativeElem = getId("native-ad-element");

    // Pick a better size for given template
    let adId = "testu7m3hc4gvm";
    if (template === "small") {
      nativeElem.style.height = "100px";
    } else if (template === "full") {
      nativeElem.style.height = "350px";
    } else if (template === "banner") {
      nativeElem.style.height = "200px";
    } else if (template === "video") {
      adId = "testy63txaom86";
      nativeElem.style.height = "300px";
    }

    // Create a new native ad with selected template
    nativeAdInstance = new HMSAds.Native();
    await nativeAdInstance.create({
      div: "native-ad-element",
      template,
      bg: "#E4E4E4",
    });

    // Subscribe ad load event, when loaded simply show the ad.
    // We need to subscribe events before calling loadAd function
    nativeAdInstance.on("nativeAdLoaded", async () => {
      console.log("nativeAdInstance :: loaded");
      await nativeAdInstance.show();
    });

    // Load the ad.
    nativeAdInstance.loadAd({
      ad,
      adId,
    });
  },

  // /////////////////////////////////////////////////////
  // Other functions
  // /////////////////////////////////////////////////////

  getOaidResult: async () => {
    const result = await HMSAds.getOaidResult();
    getId("oaidResult").innerHTML = JSON.stringify(result, null, 4);
  },

  getReferrerDetails: async () => {
    await HMSAds.disconnectFromReferrerClient();

    const result = await HMSAds.getReferrerDetails(true);
    getId("referrerDetailsResult").innerHTML = JSON.stringify(result, null, 4);
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
