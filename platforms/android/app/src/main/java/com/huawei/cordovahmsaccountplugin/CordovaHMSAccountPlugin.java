package com.huawei.cordovahmsaccountplugin;

import android.content.Intent;
import android.util.Log;

// import com.huawei.cordovahmspushplugin.CordovaHMSPushPlugin;
import com.huawei.hmf.tasks.OnCompleteListener;
import com.huawei.hmf.tasks.Task;
import com.huawei.hms.common.ApiException;
import com.huawei.hms.support.hwid.HuaweiIdAuthManager;
import com.huawei.hms.support.hwid.request.HuaweiIdAuthParams;
import com.huawei.hms.support.hwid.request.HuaweiIdAuthParamsHelper;
import com.huawei.hms.support.hwid.result.AuthHuaweiId;
import com.huawei.hms.support.hwid.service.HuaweiIdAuthService;

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
public class CordovaHMSAccountPlugin extends CordovaPlugin {

    private static final String TAG = CordovaHMSAccountPlugin.class.getSimpleName();
    private static final int REQUEST_SIGN_IN_LOGIN = 111;
    private static final int REQUEST_SIGN_IN_LOGIN_CODE = 112;
    private HuaweiIdAuthService mHuaweiIdAuthService;
    private CallbackContext mCallbackContext;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "signInWithIdToken":
                mCallbackContext = callbackContext;
                cordova.getThreadPool().execute(this::signInWithIdToken);
                return true;
            case "signInWithAuthCode":
                mCallbackContext = callbackContext;
                cordova.getThreadPool().execute(this::signInWithAuthCode);
                return true;
            case "signOut":
                mCallbackContext = callbackContext;
                cordova.getThreadPool().execute(this::signOut);
                return true;
            case "revokeAuth":
                mCallbackContext = callbackContext;
                cordova.getThreadPool().execute(this::revokeAuth);
                return true;
        }
        return false;
    }

    private void revokeAuth() {
        if (mHuaweiIdAuthService == null) {
            Log.d(TAG, "service is null");
            outputCallbackContext(1, "service is null");
            return;
        }
        //Use the HuaweiIdAuthService instance to call the getService API. The service is generated during authorization.
        mHuaweiIdAuthService.cancelAuthorization().addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                //do some thing while cancel success
                Log.i(TAG, "revokeAuth: onSuccess");
            } else {
                //do some thing while cancel success
                Exception exception = task.getException();
                if (exception instanceof ApiException) {
                    int statusCode = ((ApiException) exception).getStatusCode();
                    Log.i(TAG, "revokeAuth: onFailure - " + statusCode);
                }
            }
            mCallbackContext = null;
        });
    }

    private void signInWithIdToken() {
        HuaweiIdAuthParams mHuaweiIdAuthParams =
            new HuaweiIdAuthParamsHelper(HuaweiIdAuthParams.DEFAULT_AUTH_REQUEST_PARAM).setIdToken().createParams();
        mHuaweiIdAuthService = HuaweiIdAuthManager.getService(cordova.getActivity(), mHuaweiIdAuthParams);
        cordova.startActivityForResult(this, mHuaweiIdAuthService.getSignInIntent(), REQUEST_SIGN_IN_LOGIN);
    }

    private void signInWithAuthCode() {
        HuaweiIdAuthParams authParams =
            new HuaweiIdAuthParamsHelper(HuaweiIdAuthParams.DEFAULT_AUTH_REQUEST_PARAM).setAuthorizationCode()
                .createParams();
        mHuaweiIdAuthService = HuaweiIdAuthManager.getService(cordova.getActivity(), authParams);
        cordova.startActivityForResult(this, mHuaweiIdAuthService.getSignInIntent(), REQUEST_SIGN_IN_LOGIN_CODE);
    }

    private void signOut() {
        if (mHuaweiIdAuthService == null) {
            Log.d(TAG, "service is null");
            outputCallbackContext(1, "service is null");
            return;
        }
        Task<Void> signOutTask = mHuaweiIdAuthService.signOut();
        signOutTask.addOnCompleteListener(task -> {
            // 完成登出后的处理
            outputCallbackContext(0, "signOut complete: " + task.getResult());
            mCallbackContext = null;
        });
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case REQUEST_SIGN_IN_LOGIN:
            case REQUEST_SIGN_IN_LOGIN_CODE:
                // login success
                // get user message by parseAuthResultFromIntent
                Task<AuthHuaweiId> authHuaweiIdTask = HuaweiIdAuthManager.parseAuthResultFromIntent(data);
                if (authHuaweiIdTask.isSuccessful()) {
                    AuthHuaweiId huaweiAccount = authHuaweiIdTask.getResult();
                    String msg = "signIn success " + huaweiAccount.getDisplayName();
                    outputCallbackContext(0, msg);
                    Log.i(TAG, msg);
                } else {
                    String msg = "signIn failed: " + ((ApiException) authHuaweiIdTask.getException()).getStatusCode();
                    outputCallbackContext(1, msg);
                    Log.i(TAG, msg);
                }
                mCallbackContext = null;
                break;
        }
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
