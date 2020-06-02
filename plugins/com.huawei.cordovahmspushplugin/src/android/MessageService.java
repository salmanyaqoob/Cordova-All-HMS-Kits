package com.huawei.cordovahmspushplugin;

import com.huawei.cordovahmspushplugin.CordovaHMSPushPlugin;
import com.huawei.hms.push.HmsMessageService;
import com.huawei.hms.push.RemoteMessage;

import android.util.Log;

public class MessageService extends HmsMessageService {

    private static final String TAG = MessageService.class.getSimpleName();

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Log.d(TAG, "onMessageReceived");
        if (remoteMessage != null) {
            String message = remoteMessage.getData();
            Log.d(TAG, message);
            CordovaHMSPushPlugin.returnMessage(message);
        }
    }

    @Override
    public void onNewToken(String s) {
        super.onNewToken(s);
        if (s != null) {
            Log.d(TAG, "token:" + s);
            CordovaHMSPushPlugin.returnToken(s);
        }
    }
}
