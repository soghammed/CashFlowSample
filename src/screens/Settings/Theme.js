import React, { Component } from 'react';
import { Button, ListItem, Text, Checkbox, Overlay, Badge} from 'react-native-elements';
import { View, StyleSheet, FlatList, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { ColorWheel } from 'react-native-color-wheel';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { setThemeMode } from '../../store/actions/index';

class Theme extends Component {

	constructor(props){
		super(props);
		this.state = {
			options: {
				theme:{
					dark:{
						name: "Dark Mode",
						apiName: "dark",
					},
					light:{
						name: "Light Mode",
						apiName: "light"
					}
				},
				selectedTheme: this.props.themeMode
				// themeMode:{	
				// 	name: "Theme Mode",
				// 	avatar: (
				// 		<Icon 
				// 			name="md-color-palette"
				// 			size={30}
				// 		/>
				// 	)
				// },
				// themeColor:{
				// 	name: "Theme Color",
				// 	avatar: (
				// 		<Icon 
				// 			name="md-color-fill"
				// 			size={30}
				// 		/>
				// 	),
				// 	isVisible: false
				// }
			},
		}
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

		// console.log(this.props);
	}

	onNavigatorEvent = event => {
		console.log(event);
	}
	updateStyles(mode){
		themeObj = this.props.theme[mode];
		// console.log(themeObj, this.props);
		this.props.navigator.setStyle({
			tabBarButtonColor: themeObj.tabBarButtonColor,
			tabBarBackgroundColor: themeObj.tabBarBackgroundColor,
			tabBarSelectedButtonColor: themeObj.tabBarSelectedButtonColor,
			navBarTextColor: themeObj.navBarTextColor,
			navBarButtonColor: themeObj.navBarButtonColor,
			navBarBackgroundColor: themeObj.navBarBackgroundColor,
		});
	}

	keyExtractor = (item, index) => index.toString()

	renderItem = ({ item }) => (
	  <ListItem
	  	Component={TouchableOpacity}
	  	onPress={() => {
	  		if(item.apiName !== this.props.themeMode){
		  		this.props.onUpdateThemeMode(item.apiName);
		  		this.updateStyles(item.apiName);
		  	}
	  	}}
	  	// onPress={() => { 
	  	//  	if(item.name === "Theme Color"){
	  	//  		this.toggleOptionOvarlay(1);
	  	//  	}
	  	// }}
	    title={item.name}
	    // leftAvatar={item.avatar}
	    rightElement={
	    	this.props.themeMode === item.apiName
	    	? (
	    		<Icon
	    			name="md-checkmark"
	    			color={this.props.theme[item.apiName].navBarBackgroundColor}
	    			size={20}
	    		/>
	    	)
	    	:
	    	console.log('test')
	    }
	    // rightElement={
	    // 	item.name === "Theme Mode" 
	    // 	? (
	    // 		<Switch
	    // 			onValueChange={() => console.log(this)}
	    // 			value="dark"
	    // 			trackColor={{true: "red"}}
	    // 			// disabled=
	    // 		 />
	    // 	) 
	    // 	: 
	    // 		(
	    // 			<Badge 
	    // 				badgeStyle={{
	    // 					backgroundColor: this.props.themeColor,
	    // 					width:30,
	    // 					height:30,
	    // 					marginRight:10
	    // 				}}
	    // 			/>
	    // 	)
	    // }
	  />
	)

	// toggleOptionOvarlay(optionIndex) {
	// 	this.setState( prevState => {
	// 		return {
	// 			...prevState,
	// 			options:{
	// 				...prevState.options,
	// 				themeColor:{
	// 					...prevState.options.themeColor,
	// 					isVisible: !prevState.options.themeColor.isVisible
	// 				}
	// 			}
	// 		}
	// 	});
	// }

	render(){
		console.log('re rendering console');
		return(
			<View style={{flex:1}}>
				<FlatList 
					keyExtractor={this.keyExtractor}
					data={[this.state.options.theme.dark, this.state.options.theme.light]}
					renderItem={this.renderItem}
				/>
				{/*<Overlay
					isVisible={this.state.options.themeColor.isVisible}
					onBackdropPress={() => this.toggleOptionOvarlay(1)}
					onRequestClose={() => this.toggleOptionOvarlay(1)}
					animate="slide"
					height={60}
					overlayBackgroundColor={this.props.themeMode === 'dark' ? "#2d2d2d" : "white"}
					overlayStyle={{
						// backgroundColor:"gold",
						// display:"none",
						elevation:1,
						// backgroundColor: "rgba(0,0,0,0.5)",
						borderTopWidth:0
					}}>
					<View style={{flex:1}}>
				        <ColorWheel
				          initialColor="#ee0000"
				          onColorChange={color => console.log({color})}
				          style={{width: Dimensions.get('window').width}}
				          thumbStyle={{ height: 30, width: 30, borderRadius: 30}} />
					</View>
				</Overlay>*/}
			</View>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		// themeColor: state.settings.themeColor,
		themeMode: state.settings.themeMode,
		theme: state.settings.theme,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onUpdateThemeMode: (themeMode) => dispatch(setThemeMode(themeMode))
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Theme);