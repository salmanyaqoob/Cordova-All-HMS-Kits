package com.huawei.cordovahmsgmscheckplugin;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.huawei.hms.api.HuaweiApiAvailability;
import com.google.android.gms.common.GoogleApiAvailability;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaInterfaceImpl;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class CordovaHMSGMSCheckPlugin extends CordovaPlugin {

    private static final String TAG = CordovaHMSGMSCheckPlugin.class.getSimpleName();
    private CallbackContext mCallbackContext;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "isHmsAvailable":
                mCallbackContext = callbackContext;
                cordova.getThreadPool().execute(this::isHmsAvailable);
                return true;
            case "isGmsAvailable":
                mCallbackContext = callbackContext;
                cordova.getThreadPool().execute(this::isGmsAvailable);
                return true;
        }
        return false;
    }

    private void isHmsAvailable() {
        boolean isAvailable = false;
        Context context = cordova.getContext();
        if (null != cordova.getContext()) {
            int result = HuaweiApiAvailability.getInstance().isHuaweiMobileServicesAvailable(context);
            isAvailable = (com.huawei.hms.api.ConnectionResult.SUCCESS == result);
        }
        Log.i("Cordova", "isHmsAvailable: " + isAvailable);
        String msg = "false";
        if(isAvailable){
            msg = "true";
        }
        outputCallbackContext(0, msg);
    }

    private void isGmsAvailable() {
        boolean isAvailable = false;
        Context context = cordova.getContext();
        if (null != context) {
            int result = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(context);
            isAvailable = (com.google.android.gms.common.ConnectionResult.SUCCESS == result);
        }
        Log.i("Cordova",  "isGmsAvailable: " + isAvailable);
        String msg = "false";
        if(isAvailable){
            msg = "true";
        }
        outputCallbackContext(0, msg);
    }

    /**
     * @param type 0-success,1-error
     * @param msg message
     */
    private void outputCallbackContext(int type, String msg) {
        if (mCallbackContext != null) {
            switch (type) {
                case 0:
                    mCallbackContext.success(msg);
                    break;
                case 1:
                    mCallbackContext.error(msg);
                    break;
            }
        }
    }
}
