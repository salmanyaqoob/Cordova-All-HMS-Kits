package com.huawei.analyticsplugin;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import com.huawei.hms.analytics.HiAnalytics;
import com.huawei.hms.analytics.HiAnalyticsInstance;
import com.huawei.hms.analytics.HiAnalyticsTools;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

/**
 * This class echoes a string called from JavaScript.
 */
public class HMSAnalyticsPlugin extends CordovaPlugin {

    private static final String TAG = HMSAnalyticsPlugin.class.getSimpleName();
    private HiAnalyticsInstance instance;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        // 打开SDK日志开关
        HiAnalyticsTools.enableLog();
        // 或者使用Context初始化
        Context context = cordova.getContext();
        instance = HiAnalytics.getInstance(context);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("log")) {
            Log.d(TAG, args.toString());
            JSONObject userCategory = args.getJSONObject(0);
            Log.d(TAG, userCategory.toString());
//            instance.setUserProfile("category", userCategory);
//            JSONObject object = args.getJSONObject(1);
//            this.log(object, callbackContext);
            return true;
        }
        return false;
    }

    private void log(JSONObject object, CallbackContext callbackContext) {
        if (object != null) {
            Bundle bundle = new Bundle();
            for (Iterator<String> it = object.keys(); it.hasNext(); ) {
                String key = it.next();
                bundle.putString(key,object.optString(key));
            }
            instance.onEvent("cordova analytics test", bundle);
            callbackContext.success("upload success.");
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
