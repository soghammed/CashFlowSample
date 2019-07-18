import React, { Component } from 'react';
import { Text, View, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';


class Settings extends Component {

	constructor(props) {

		super(props);
		this.state = {
			rootOptionsList:[
				{
					name: "General",
					subtitle: "Other settings",
					avatar: (
						<Icon
							name="md-settings"
							size={30}
						/>
					)
				},
				{
					name: "Theme",
					subtitle: "Dark mode or Light mode",
					avatar: (
						<Icon 
							name="md-color-palette"
							size={30}
						/>
					)
				}
			]
		}
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
		// this.props.navigatorsetStyle
		// this.renderItem = this.renderItem.bind(this);
	}

	launchSubView = name => {
		// console.log(this.props);
		switch(name){
			case "General":
				//launch
				break;
			case "Theme":
				//launch theme screen or push rather.
				this.props.navigator.push({
				  screen: 'settings.theme', // unique ID registered with Navigation.registerScreen
				  title: "Theme Settings", // navigation bar title of the pushed screen (optional)
				  // subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
				  // titleImage: require('../../img/my_image.png'), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
				  // passProps: {}, // Object that will be passed as props to the pushed screen (optional)
				  animated: true, // does the push have transition animation or does it happen immediately (optional)
				  animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
				  // backButtonTitle: undefined, // override the back button title (optional)
				  // backButtonHidden: false, // hide the back button altogether (optional)
				  navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
				  navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
				  // enable peek and pop - commited screen will have `isPreview` prop set as true.
				  // previewView: undefined, // react ref or node id (optional)
				  // previewHeight: undefined, // set preview height, defaults to full height (optional)
				  // previewCommit: true, // commit to push preview controller to the navigation stack (optional)
				  // previewActions: [{ // action presses can be detected with the `PreviewActionPress` event on the commited screen.
				    // id: '', // action id (required)
				    // title: '', // action title (required)
				    // style: undefined, // 'selected' or 'destructive' (optional)
				    // actions: [], // list of sub-actions
				  // }],
				});
				break;
		}
	}

	keyExtractor = (item, index) => index.toString()

	renderItem = ({ item }) => (
	  <ListItem
	  	Component={TouchableOpacity}
	  	onPress={() => this.launchSubView(item.name)}
	    title={item.name}
	    subtitle={item.subtitle}
	    leftAvatar={item.avatar}
	    rightIcon={
	    	<Icon
	    		name="md-arrow-dropright"
	    		size={20}
	    	/>
	    }
	  />
	)

	onNavigatorEvent = event => {
		// console.log(event, this.launchSubView);
	}

	render(){
		return(
			<View style={{flex:1}}>
				<FlatList 
					keyExtractor={this.keyExtractor}
					data={this.state.rootOptionsList}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}
}


export default Settings;