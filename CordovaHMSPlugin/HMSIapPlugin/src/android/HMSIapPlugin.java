package com.huawei.iapplugin;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.util.Log;

import com.huawei.hmf.tasks.OnFailureListener;
import com.huawei.hmf.tasks.Task;
import com.huawei.hms.iap.Iap;
import com.huawei.hms.iap.IapApiException;
import com.huawei.hms.iap.entity.ConsumeOwnedPurchaseReq;
import com.huawei.hms.iap.entity.ConsumeOwnedPurchaseResult;
import com.huawei.hms.iap.entity.InAppPurchaseData;
import com.huawei.hms.iap.entity.IsEnvReadyResult;
import com.huawei.hms.iap.entity.OrderStatusCode;
import com.huawei.hms.iap.entity.ProductInfo;
import com.huawei.hms.iap.entity.ProductInfoReq;
import com.huawei.hms.iap.entity.ProductInfoResult;
import com.huawei.hms.iap.entity.PurchaseIntentReq;
import com.huawei.hms.iap.entity.PurchaseIntentResult;
import com.huawei.hms.iap.entity.PurchaseResultInfo;
import com.huawei.hms.support.api.client.Status;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * This class echoes a string called from JavaScript.
 */
public class HMSIapPlugin extends CordovaPlugin {

    private static final String TAG = HMSIapPlugin.class.getSimpleName();

    private CallbackContext mIsIapSupportedCallbackContext;
    private CallbackContext mInitPurchaseCallbackContext;
    
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, action);
        cordova.setActivityResultCallback(HMSIapPlugin.this);
        switch (action) {
            case "isIapSupported":
                cordova.getThreadPool().execute(() -> isIapSupported(callbackContext));
                return true;
            case "getProductDetails":
                cordova.getThreadPool().execute(() -> getProductDetails(callbackContext));
                return true;
            case "initPurchase":
                Log.d(TAG, args.toString());
                JSONObject data = args.getJSONObject(0);
                cordova.getThreadPool().execute(new Runnable() {
                    @Override
                    public void run() {
                        initPurchase(data.optString("productId"), data.optInt("priceType"), callbackContext);
                    }
                });
                return true;
        }
        return false;
    }

    private void confirmPurchase(String inAppPurchaseData, CallbackContext callbackContext) {
        Log.d(TAG, "confirmPurchase");
        // Constructs a ConsumeOwnedPurchaseReq object.
        String purchaseToken = "";
        try {
            InAppPurchaseData inAppPurchaseDataBean = new InAppPurchaseData(inAppPurchaseData);
            purchaseToken = inAppPurchaseDataBean.getPurchaseToken();
        } catch (JSONException e) {
        }
        ConsumeOwnedPurchaseReq req = new ConsumeOwnedPurchaseReq();
        req.setPurchaseToken(purchaseToken);
        // to call the consumeOwnedPurchase API.
        // To get the Activity instance that calls this API.
        Activity activity = cordova.getActivity();
        Task<ConsumeOwnedPurchaseResult> task = Iap.getIapClient(activity).consumeOwnedPurchase(req);
        task.addOnSuccessListener(result -> {
            // Obtain the result
            callbackContext.success("returnCode: " + result.getReturnCode());
        }).addOnFailureListener(new BasicOnFailureListener(callbackContext));
    }

    private void initPurchase(String productId, int priceType, CallbackContext callbackContext) {
        // Constructs a PurchaseIntentReq object.
        PurchaseIntentReq req = new PurchaseIntentReq();
        // The product ID is the same as that set by a developer when configuring product information in AppGallery
        // Connect.
        req.setProductId(productId);
        // In-app product type contains:
        // priceType: 0: consumable; 1: non-consumable; 2: auto-renewable subscription
        req.setPriceType(priceType);
        req.setDeveloperPayload("cordova_test");
        // to call the createPurchaseIntent API.
        // To get the Activity instance that calls this API.
        Activity activity = cordova.getActivity();
        Task<PurchaseIntentResult> task = Iap.getIapClient(activity).createPurchaseIntent(req);
        task.addOnSuccessListener(result -> {
            // Obtain the payment result.
            Status status = result.getStatus();
            if (status.hasResolution()) {
                try {
                    // 6667 is an int constant defined by the developer.
                    mInitPurchaseCallbackContext = callbackContext;
                    status.startResolutionForResult(cordova.getActivity(), 6667);
                } catch (IntentSender.SendIntentException exp) {
                }
            }
        }).addOnFailureListener(new BasicOnFailureListener(callbackContext));
    }

    private void getProductDetails(CallbackContext callbackContext) {
        // Pass in the productId list of products to be queried.
        List<String> productIdList = new ArrayList<>();
        // The product ID is the same as that set by a developer when configuring product information in AppGallery
        // Connect.
        productIdList.add("1001");
        ProductInfoReq req = new ProductInfoReq();
        // priceType: 0: consumable; 1: non-consumable; 2: auto-renewable subscription
        req.setPriceType(0);
        req.setProductIds(productIdList);
        // to call the obtainProductInfo API.
        // To get the Activity instance that calls this API.
        Activity activity = cordova.getActivity();
        Task<ProductInfoResult> task = Iap.getIapClient(activity).obtainProductInfo(req);
        task.addOnSuccessListener(result -> {
            // Obtain the result
            List<ProductInfo> productList = result.getProductInfoList();
            JSONArray jsonArray = new JSONArray();
            for (ProductInfo productInfo : productList) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("productId", productInfo.getProductId());
                    jsonObject.put("price", productInfo.getPrice());
                    jsonObject.put("priductName", productInfo.getProductName());
                    jsonArray.put(jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            Log.d(TAG,jsonArray.toString());
            callbackContext.success(jsonArray);
        }).addOnFailureListener(new BasicOnFailureListener(callbackContext));
    }

    private void isIapSupported(CallbackContext callbackContext) {
        // To get the Activity instance that calls this API.
        Activity activity = cordova.getActivity();
        Task<IsEnvReadyResult> task = Iap.getIapClient(activity).isEnvReady();
        task.addOnSuccessListener(result -> {
            // Obtain the execution result.
            int returnCode = result.getReturnCode();
            callbackContext.success((returnCode == 0) ? "check IAP pass." : "return code: " + returnCode);
        }).addOnFailureListener(e -> {
            if (e instanceof IapApiException) {
                IapApiException apiException = (IapApiException) e;
                Status status = apiException.getStatus();
                if (status.getStatusCode() == OrderStatusCode.ORDER_HWID_NOT_LOGIN) {
                    // Not logged in.
                    if (status.hasResolution()) {
                        try {
                            // 6666 is an int constant defined by the developer.
                            mIsIapSupportedCallbackContext = callbackContext;
                            status.startResolutionForResult(cordova.getActivity(), 6666);
                        } catch (IntentSender.SendIntentException exp) {
                        }
                    }
                } else if (status.getStatusCode() == OrderStatusCode.ORDER_ACCOUNT_AREA_NOT_SUPPORTED) {
                    // The current region does not support HUAWEI IAP.
                    callbackContext.error("ORDER_ACCOUNT_AREA_NOT_SUPPORTED");
                }
            }
        });
    }
    
    private class BasicOnFailureListener implements OnFailureListener {
        CallbackContext callbackContext;

        BasicOnFailureListener(CallbackContext callbackContext) {
            this.callbackContext = callbackContext;
        }

        @Override
        public void onFailure(Exception e) {
            if (e instanceof IapApiException) {
                IapApiException apiException = (IapApiException) e;
                int returnCode = apiException.getStatusCode();
                callbackContext.error("returnCode: " + returnCode);
            } else {
                // Other external errors
                callbackContext.error("Other external errors");
            }
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (data == null) {
            Log.e("onActivityResult", "data is null");
            return;
        }
        switch (requestCode) {
            case 6666:
                // Obtain the execution result.
                int returnCode = data.getIntExtra("returnCode", 1);
                mIsIapSupportedCallbackContext.success("returnCode: " + returnCode);
                mIsIapSupportedCallbackContext = null;
                break;
            case 6667:
                PurchaseResultInfo purchaseResultInfo =
                    Iap.getIapClient(cordova.getActivity()).parsePurchaseResultInfoFromIntent(data);
                switch (purchaseResultInfo.getReturnCode()) {
                    case OrderStatusCode.ORDER_STATE_CANCEL:
                        // User cancel payment.
                        Log.d(TAG, "ORDER_STATE_CANCEL");
                        break;
                    case OrderStatusCode.ORDER_STATE_FAILED:
                        Log.d(TAG, "ORDER_STATE_FAILED");
                        break;
                    case OrderStatusCode.ORDER_PRODUCT_OWNED:
                        // to check if there exists undelivered products.
                        Log.d(TAG, "ORDER_PRODUCT_OWNED");
                        break;
                    case OrderStatusCode.ORDER_STATE_SUCCESS:
                        // pay success.
                        String inAppPurchaseData = purchaseResultInfo.getInAppPurchaseData();
                        String inAppPurchaseDataSignature = purchaseResultInfo.getInAppDataSignature();
                        // use the public key of your app to verify the signature.
                        // If ok, you can deliver your products.
                        // If the user purchased a consumable product, call the consumeOwnedPurchase API to consume it
                        // after successfully delivering the product.
                        confirmPurchase(inAppPurchaseData, mInitPurchaseCallbackContext);
                        break;
                    default:
                        break;
                }
                break;
        }
    }
}
