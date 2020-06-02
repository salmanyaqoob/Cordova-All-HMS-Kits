package com.huawei.cordovahmspushplugin;

import android.text.TextUtils;
import android.util.Log;

import com.huawei.agconnect.config.AGConnectServicesConfig;
import com.huawei.hms.aaid.HmsInstanceId;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;

/**
 * This class echoes a string called from JavaScript.
 */
public class CordovaHMSPushPlugin extends CordovaPlugin {

	private static final String TAG = CordovaHMSPushPlugin.class.getSimpleName();

	private static CallbackContext mCallbackContext;
    private static CallbackContext mTokenCallback;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        switch (action) {
            case "getToken":
                this.getToken(callbackContext);
                return true;
            case "getMessageCallback":
                Log.d(TAG, "getMessageCallback");
                mCallbackContext = callbackContext;
                return true;
            default:
                return false;
        }
    }

    public static void returnMessage(String message) {
        if (mCallbackContext != null) {
            Log.d(TAG, "returnMessage");
            PluginResult result = new PluginResult(PluginResult.Status.OK, message);
            result.setKeepCallback(true);
            mCallbackContext.sendPluginResult(result);
        }
    }

    public static void returnToken(String token) {
        if (mTokenCallback != null) {
            mTokenCallback.success(token);
            mTokenCallback = null;
        }
    }

    /**
     * get push token
     */
    private void getToken(CallbackContext callbackContext) {
        Log.i(TAG, "get token: begin");

        try {
            String appId = AGConnectServicesConfig.fromContext(cordova.getContext()).getString("client/app_id");
            String pushToken = HmsInstanceId.getInstance(cordova.getContext()).getToken(appId, "HCM");
            if (!TextUtils.isEmpty(pushToken)) {
                Log.i(TAG, "get token:" + pushToken);
                callbackContext.success(pushToken);
            }else {
                mTokenCallback = callbackContext;
            }
		} catch (Exception e) {
			Log.e(TAG, "getToken Failed, " + e);
			callbackContext.error("getToken Failed, error : " + e.getMessage());
		}
	}

}
