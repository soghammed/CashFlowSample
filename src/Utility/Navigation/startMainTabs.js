import { Component } from 'react';
import { Avatar } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import AppTheme from '../../store/export/index';
import { connect } from 'react-redux';

//screens need not importing as uid suffices.

const startTabs = (themeObj) => {
	Promise.all([
			Icon.getImageSource("md-home", 30),
			Icon.getImageSource("md-settings", 30),
			Icon.getImageSource("md-menu", 30),
			Icon.getImageSource("md-clipboard", 30),
			themeObj,
			Icon.getImageSource("md-refresh", 30),
			Icon.getImageSource("md-add", 30)
		]).then(sources => {
			Navigation.startSingleScreenApp({

			  screen: {
			    screen: "dashboard",
			    title: "Activity",
				navigatorButtons: {
					leftButtons:[
						{
							id: 'sideMenu',
							// icon: sources[2],
							title: 'Menu',
						}
					],
					rightButtons:[
						{
							id: 'addItem',
							icon: sources[6]
						},
						{
							id: 'refreshItems',
							icon: sources[5]
						}
					]
				},
				navigatorStyle:{
					// navBarTitleTextCentered: true,
					// navBarHeight: 100,
					// drawUnderNavBar: true,
					// navBarCustomView: 'dashboard.buttongroup',
					// navBarComponentAlignment: "fill",
					// topBarElevationShadowEnabled: false
					// drawUnderTabBar: true,
					// navBarTranslucent: true,
					// topTabsHeight:100
					// tabBarButtonColor: "grey",//sources[4].tabBarButtonColor,
					// tabBarBackgroundColor: sources[4].tabBarBackgroundColor,
					// tabBarSelectedButtonColor: sources[4].tabBarSelectedButtonColor,
					//tabBarHideShadow boolean, 
					//tabBarTranslucent: false,
					//tabFontFamily
					//tabFontSize
					//selectedFontSize
					navBarTextColor: sources[4].navBarTextColor,
					navBarButtonColor: sources[4].navBarButtonColor,
					navBarBackgroundColor: sources[4].navBarBackgroundColor,
				},
			    // navigatorStyle: {
			    //   drawUnderNavBar: true,
			    //   navBarHidden: true
			    //   // navBarTransparent: true,
			    //   // navBarTranslucent: true 
			    // },
			    // navigationBarStyle:{ navBarHidden: true },
			  },
			  drawer:{
					left:{
						screen: 'sidedrawer'
					}
				}

			});
			// Navigation.startTabBasedApp({
			// 	tabs: [
			// 		{
			// 			label: "Dashboard",
			// 			screen: 'dashboard',
			// 			icon: sources[0],
			// 			title: "Activity",
			// 			navigatorButtons: {
			// 				leftButtons:[
			// 					{
			// 						id: 'sideMenu',
			// 						// icon: sources[2],
			// 						title: 'Menu',
			// 					}
			// 				],
			// 				rightButtons:[
			// 					{
			// 						id: 'addItem',
			// 						icon: sources[6]
			// 					},
			// 					{
			// 						id: 'refreshItems',
			// 						icon: sources[5]
			// 					}
			// 				]
			// 			},
			// 			navigatorStyle:{
			// 				// navBarTitleTextCentered: true,
			// 				// navBarHeight: 100,
			// 				// drawUnderNavBar: true,
			// 				// navBarCustomView: 'dashboard.buttongroup',
			// 				// navBarComponentAlignment: "fill",
			// 				// topBarElevationShadowEnabled: false
			// 				// drawUnderTabBar: true,
			// 				// navBarTranslucent: true,
			// 				// topTabsHeight:100
			// 			},
			// 		},
			// 		{
			// 			label: "To-do List",
			// 			screen: 'toDoList',
			// 			icon: sources[3],
			// 			navigatorButtons: {
			// 				leftButtons:[
			// 					{
			// 						id: 'sideMenu',
			// 						// icon: sources[2],
			// 						title: 'Menu',
			// 					}
			// 				]
			// 			}
			// 		},
			// 		{
			// 			label: "Settings",
			// 			screen: 'settings',
			// 			icon: sources[1],
			// 			navigatorButtons: {
			// 				leftButtons:[
			// 					{
			// 						id: 'sideMenu',
			// 						// icon: sources[2],
			// 						title: 'Menu',
			// 					}
			// 				]
			// 			}
			// 		}
			// 	],
			// 	appStyle:{
			// 		tabBarButtonColor: "grey",//sources[4].tabBarButtonColor,
			// 		tabBarBackgroundColor: sources[4].tabBarBackgroundColor,
			// 		tabBarSelectedButtonColor: sources[4].tabBarSelectedButtonColor,
			// 		//tabBarHideShadow boolean, 
			// 		//tabBarTranslucent: false,
			// 		//tabFontFamily
			// 		//tabFontSize
			// 		//selectedFontSize
			// 		navBarTextColor: sources[4].navBarTextColor,
			// 		navBarButtonColor: sources[4].navBarButtonColor,
			// 		navBarBackgroundColor: sources[4].navBarBackgroundColor,

			// 	},
			// 	drawer:{
			// 		left:{
			// 			screen: 'sidedrawer'
			// 		}
			// 	}
			// })
		})

}

const mapStateToProps = state => {
	return {
		themeColor: state.settings.themeColor,
		themeMode: state.settings.themeMode
	}
}

// export default connect(mapStateToProps, null)(startTabs);
export default startTabs;