package com.cashflow;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.imagepicker.ImagePickerPackage;
//for RNNavigation1 
import com.reactnativenavigation.NavigationApplication;
//for RNNavigation2 but downgraded.
// import com.reactnativenavigation.NavigationApplication;
// import com.reactnativenavigation.react.NavigationReactNativeHost;
// import com.reactnativenavigation.react.ReactGateway;

import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

// public class MainApplication extends Application implements ReactApplication {
public class MainApplication extends NavigationApplication {
  //for rnnavigation v2 but downgrded. 
  // @Override
  // protected ReactGateway createReactGateway() {
  //     ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
  //         @Override
  //         protected String getJSMainModuleName() {
  //             return "index";
  //         }
  //     };
  //     return new ReactGateway(this, isDebug(), host);
  // }
  //from here to getPackages is for rnnavigation v1 
  @Override
  public String getJSMainModuleName() {
    return "index";
  }
  @Override
  public boolean isDebug() {
      return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
      // Add additional packages you require here
      // No need to add RnnPackage and MainReactPackage
      return Arrays.<ReactPackage>asList(
        new VectorIconsPackage(),
        new ImagePickerPackage()
      );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }

  // private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  //   @Override
  //   public boolean getUseDeveloperSupport() {
  //     return BuildConfig.DEBUG;
  //   }

  //   @Override
  //   protected List<ReactPackage> getPackages() {
  //     return Arrays.<ReactPackage>asList(
  //         new MainReactPackage()
  //     );
  //   }

  //   @Override
  //   protected String getJSMainModuleName() {
  //     return "index";
  //   }
  // };

  // @Override
  // public ReactNativeHost getReactNativeHost() {
  //   return mReactNativeHost;
  // }

  // @Override
  // public void onCreate() {
  //   super.onCreate();
  //   SoLoader.init(this, /* native exopackage */ false);
  // }
}
