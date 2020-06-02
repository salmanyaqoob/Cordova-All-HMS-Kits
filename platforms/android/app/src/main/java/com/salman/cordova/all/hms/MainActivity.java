/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.salman.cordova.all.hms;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import org.apache.cordova.*;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.engine.SystemWebView;

import com.salman.cordova.all.hms.map.MapActivity;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }

    private final class JSInterface {
        @SuppressLint("JavascriptInterface")
        @JavascriptInterface
        public void openMap() {
            Intent intent = new Intent(MainActivity.this, MapActivity.class);
            startActivity(intent);
        }

        // @SuppressLint("JavascriptInterface")
        // @JavascriptInterface
        // public void openPMS() {
        //     Intent intent = new Intent(MainActivity.this, PMSActivity.class);
        //     startActivity(intent);
        // }
    }
}
