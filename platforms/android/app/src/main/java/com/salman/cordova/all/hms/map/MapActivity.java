package com.salman.cordova.all.hms.map;

import android.Manifest;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import com.salman.cordova.all.hms.R;
import com.huawei.hms.maps.HuaweiMap;
import com.huawei.hms.maps.MapView;
import com.huawei.hms.maps.OnMapReadyCallback;
import com.huawei.hms.maps.model.LatLng;
import com.huawei.hms.maps.model.Marker;
import com.huawei.hms.maps.model.MarkerOptions;
import com.huawei.hms.maps.util.LogM;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewImpl;
import org.apache.cordova.engine.SystemWebView;
import org.apache.cordova.engine.SystemWebViewEngine;

public class MapActivity extends CordovaActivity implements OnMapReadyCallback {

    public static final String TAG = MapActivity.class.getSimpleName();

    private MapView mMapView;
    private HuaweiMap hmap;
    private Marker mMarker;

    private static final String[] RUNTIME_PERMISSIONS = {Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.INTERNET};
    private static final int REQUEST_CODE = 111;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        LogM.d(TAG, "onCreate:");
        reqPermissions();
        setContentView(R.layout.activity_map);
        super.init();

        loadUrl("file:///android_asset/www/map.html");

        SystemWebView systemWebView = (SystemWebView) appView.getView();
        systemWebView.addJavascriptInterface(new JSInterface(), "map_api");

        mMapView = findViewById(R.id.mapView);
        Bundle mapViewBundle = null;
        if (savedInstanceState != null) {
            mapViewBundle = savedInstanceState.getBundle("MapViewBundleKey");
        }
        mMapView.onCreate(mapViewBundle);
        mMapView.getMapAsync(this);
    }

    private final class JSInterface {
        @SuppressLint("JavascriptInterface")
        @JavascriptInterface
        public void addMarker() {
            Toast.makeText(MapActivity.this, "addMarker", Toast.LENGTH_LONG).show();
            if (null != mMarker) {
                mMarker.remove();
            }
            MarkerOptions options = new MarkerOptions().position(new LatLng(25.164829, 55.229096))
                .title("Hello Huawei Map")
                .snippet("This is a snippet!");
            mMarker = hmap.addMarker(options);
        }
    }

    @Override
    protected CordovaWebView makeWebView() {
        SystemWebView webView = findViewById(R.id.cordovaWebView);
        return new CordovaWebViewImpl(new SystemWebViewEngine(webView));
    }

    @Override
    protected void createViews() {
        //Why are we setting a constant as the ID? This should be investigated
//        appView.getView().setId(100);
//        appView.getView().setLayoutParams(new FrameLayout.LayoutParams(
//                ViewGroup.LayoutParams.MATCH_PARENT,
//                ViewGroup.LayoutParams.MATCH_PARENT));
//
//        setContentView(appView.getView());

        if (preferences.contains("BackgroundColor")) {
            int backgroundColor = preferences.getInteger("BackgroundColor", Color.BLUE);
            // Background of activity:
            appView.getView().setBackgroundColor(backgroundColor);
        }

        appView.getView().requestFocusFromTouch();
    }

    @Override
    public void onMapReady(HuaweiMap map) {
        Log.d(TAG, "onMapReady: ");
        hmap = map;
        hmap.setMyLocationEnabled(true);
    }

    @Override
    protected void onStart() {
        super.onStart();
        mMapView.onStart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        mMapView.onStop();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mMapView.onDestroy();
    }

    @Override
    protected void onPause() {
        mMapView.onPause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mMapView.onResume();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mMapView.onLowMemory();
    }

    @TargetApi(Build.VERSION_CODES.M)
    private void reqPermissions() {
        if (!hasPermissions(RUNTIME_PERMISSIONS)) {
            requestPermissions(RUNTIME_PERMISSIONS, REQUEST_CODE);
        }
    }

    private boolean hasPermissions(String... permissions) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && permissions != null) {
            for (String permission : permissions) {
                if (checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
                    return false;
                }
            }
        }
        return true;
    }
}
