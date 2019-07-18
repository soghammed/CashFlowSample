import { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

//screens need not importing as uid suffices.


class startTabs extends Component {


	startT = () => {
		console.log('running');
		Promise.all([
				Icon.getImageSource("md-home", 30),
				Icon.getImageSource("md-settings", 30),
				Icon.getImageSource("md-menu", 30),
				Icon.getImageSource("md-clipboard", 30)
			]).then(sources => {
				Navigation.startTabBasedApp({
					tabs: [
						{
							label: "Dashboard",
							screen: 'dashboard',
							icon: sources[0],
							title: "Activity",
							navigatorButtons: {
								leftButtons:[
									{
										id: 'sideMenu',
										// icon: sources[2],
										title: 'Menu',
									}
								]
							},
							navigatorStyle:{
								navBarTitleTextCentered: true,
								// navBarHeight: 100,
								// drawUnderNavBar: true,
								// navBarCustomView: 'dashboard.buttongroup',
								// navBarComponentAlignment: "fill",
								topBarElevationShadowEnabled: false
								// drawUnderTabBar: true,
								// navBarTranslucent: true,
								// topTabsHeight:100
							},
						},
						{
							label: "To-do List",
							screen: 'toDoList',
							icon: sources[3],
							navigatorButtons: {
								leftButtons:[
									{
										id: 'sideMenu',
										// icon: sources[2],
										title: 'Menu',
									}
								]
							}
						},
						{
							label: "Settings",
							screen: 'settings',
							icon: sources[1],
							navigatorButtons: {
								leftButtons:[
									{
										id: 'sideMenu',
										// icon: sources[2],
										title: 'Menu',
									}
								]
							}
						}
					],
					appStyle:{
						tabBarSelectedButtonColor: "#26A69A",
						navBarButtonColor: "#26A69A",
					},
					drawer:{
						left:{
							screen: 'sidedrawer'
						}
					}
				})
			})
	}
}

const mapStateToProps = state => {
	return {
		themeColor: state.settings.themeColor,
		themeMode: state.settings.themeMode
	}
}

// export default connect(mapStateToProps, null)(startTabs);
export default startTabs;