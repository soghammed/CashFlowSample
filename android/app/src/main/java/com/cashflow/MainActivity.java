package com.cashflow;

import com.facebook.react.ReactActivity;
//for RNNavigationv1
import com.reactnativenavigation.controllers.SplashActivity;
//for RNNavigationv2 but downgraded;
// import com.reactnativenavigation.NavigationActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

// public class MainActivity extends ReactActivity {
public class MainActivity extends SplashActivity implements OnImagePickerPermissionsCallback {

	//copied from here (including implements onimage...)
	private PermissionListener listener;

	 @Override
	  public void setPermissionListener(PermissionListener listener)
	  {
	    this.listener = listener;
	  }

	  @Override
	  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
	  {
	    if (listener != null)
	    {
	      listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
	    }
	    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
	  }
	 //until here.
	  
 	 @Override
	public LinearLayout createSplashLayout() {
		LinearLayout view = new LinearLayout(this);
		TextView textView = new TextView(this);

		view.setBackgroundColor(Color.parseColor("#00294F"));
		view.setGravity(Gravity.CENTER);

		textView.setTextColor(Color.parseColor("#FFD700"));
		textView.setText("Cash Flow");
		textView.setGravity(Gravity.CENTER);
		textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

		view.addView(textView);
		return view;
	}
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    // @Override
    // protected String getMainComponentName() {
        // return "CashFlow";
    // }
}
