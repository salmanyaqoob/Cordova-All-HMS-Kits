package com.huawei.cordovahmspushplugin;

import android.text.TextUtils;
import android.util.Log;

import com.huawei.agconnect.config.AGConnectServicesConfig;
import com.huawei.hms.aaid.HmsInstanceId;
import com.huawei.hms.push.HmsMessaging;
import com.huawei.hmf.tasks.OnCompleteListener;
import com.huawei.hmf.tasks.Task;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

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
            case "subscribeTopic":
				Log.d(TAG, "subscribeTopic");
                try {
                    String topic = args.getString(0); 
                    this.subscribeTopic(topic, callbackContext);
                } catch (JSONException e) {
                    return true;
                }
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

   public void subscribeTopic(String topic, final CallbackContext callBack) {
		// callBack.success("user subscribe to topic named as: "+ topic);
        if (topic == null || topic.toString().equals("")) {
			callBack.error("topic is empty!");
            return;
        }
        try {
            HmsMessaging.getInstance(cordova.getContext()).subscribe(topic).
                    addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(Task<Void> task) {
                            if (task.isSuccessful()) {
                                callBack.success("user subscribe to topic: "+ topic);
                            } else {
                                callBack.error("getToken Failed, error : " + task.getException().getMessage());
                            }
                        }
                    });
        } catch (Exception e) {
            callBack.error("getToken Failed, error : " + e.getMessage());
        }
    }

}
