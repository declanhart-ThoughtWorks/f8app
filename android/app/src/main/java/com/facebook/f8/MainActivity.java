/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 */

package com.facebook.f8;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.CallbackManager;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import android.content.Intent;
import android.os.Bundle;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.Arrays;
import java.util.List;

import com.BV.LinearGradient.LinearGradientPackage;
import com.microsoft.codepush.react.CodePush;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import cl.json.RNSharePackage;

import com.burnweb.rnsendintent.RNSendIntentPackage;

public class MainActivity extends ReactActivity {
  private ReactNativePushNotificationPackage _pushNotification;
  private CallbackManager mCallbackManager;

    @Override
    protected String getJSBundleFile() {
        return CodePush.getBundleUrl();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "F8v2";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      this._pushNotification = new ReactNativePushNotificationPackage(this);
      mCallbackManager = new CallbackManager.Factory().create();

      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new FBSDKPackage(mCallbackManager),
        new LinearGradientPackage(),
        new RNSharePackage(),
        new RNSendIntentPackage(),
        new CodePush("qwfkzzq7Y8cSrkiuU7aRCkIP7XYLEJ6b-AFoe", this, BuildConfig.DEBUG),
        this._pushNotification
      );
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
        try {
            PackageInfo info = getPackageManager().getPackageInfo(
                    "com.facebook.f8",
                    PackageManager.GET_SIGNATURES);
            for (Signature signature : info.signatures) {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
            }
        } catch (PackageManager.NameNotFoundException e) {

        } catch (NoSuchAlgorithmException e) {

        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }

   @Override
   public void onNewIntent (Intent intent) {
     super.onNewIntent(intent);
     _pushNotification.newIntent(intent);
   }

  @Override
  protected void onResume() {
      super.onResume();
      AppEventsLogger.activateApp(getApplicationContext());
  }

  @Override
  protected void onPause() {
      super.onPause();
      AppEventsLogger.deactivateApp(getApplicationContext());
  }

  @Override
  protected void onStop() {
      super.onStop();
      AppEventsLogger.onContextStop();
  }
}
