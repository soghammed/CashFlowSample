import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, Image, ImageBackground} from 'react-native';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { ButtonGroup, Avatar, ListItem, Overlay, Button, Text, Input } from 'react-native-elements';
// import menuIcon from '../../assets/img/android-menu.png';
import PlaceHolderImage from '../../assets/img/CheckOut.png';
// import pic from '../../assets/img/tab2.jpg';
import pic1 from '../../assets/img/tab1.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { uiStartLoading, uiStopLoading, addItem, deleteItem, setCurrentBalance, getItems } from '../../store/actions/index';
import OutboundList from '../Outbound/Outbound';
import InboundList from '../Inbound/Inbound';
import ItemList from '../ItemList/ItemList';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ButtonsGroup from '../../components/UI/ButtonsGroup/ButtonsGroup';
import img1 from '../../assets/img/authBackground.jpg';
import img2 from '../../assets/img/authBackground2.jpg';
import img3 from '../../assets/img/authBackground2.png';
import img4 from '../../assets/img/authBackground3.png';
// import ImagePicker from 'react-native-image-picker';
// import AddItemOverlay from './AddItemOverlay';
// import AddInboundOverlay from './AddItemOverlay';
// import AddOutboundOverlay from './AddItemOverlay';

class Dashboard extends Component {


	constructor(props) {
		super(props);
		this.updateIndex = this.updateIndex.bind(this);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	//set default 
	setInitialState() {
		this.setState({
			selectedIndex: 0,
			modals:{
				addItem:{
					title: {
						value: null,
						valid: false,
						touched: false
					},
					amount: {
						value: null,
						valid: false,
						touched: false
					},
					description:  {
						value: null,
						valid: false,
						touched: false
					},
					image: {
						uri: null
					},
					isVisible: false
				},
				all:{
					isVisible: false
				},
				inbound:{
					title: {
						value: null,
						valid: false,
						touched: false
					},
					amount: {
						value: null,
						valid: false,
						touched: false
					},
					description:  {
						value: null,
						valid: false,
						touched: false
					},
					image: {
						uri: null
					},
					isVisible: false
				},
				outbound:{
					title: {
						value: null,
						valid: false,
						touched: false
					},
					amount: {
						value: null,
						valid: false,
						touched: false
					},
					description:  {
						value: null,
						valid: false,
						touched: false
					},
					image: null,
					isVisible: false
				}
			},
			itemsLoaded: false,
		});
	}

	updateIndex(selectedIndex) {
		console.log(selectedIndex);
		this.props.uiStartLoading();
		this.setState(prevState => {
			return {
				...prevState,
				selectedIndex: selectedIndex
			};
		});
		this.props.uiStopLoading();
	}

	componentWillMount() {
		// console.log(DefaultInput);
		//get here
		this.setInitialState();
				// console.log('oo',this.state);
				// console.log('oo',this.state);
		this.itemsLoadedHandler();
	}

	componentDidMount(){
		// this.props.onGetItems(this.itemsLoadedHandler);

	}



	componentDidAppear() {
		
		// this.navigationEventListener = Navigation.events().bindComponent(this);
		// this.props.navigator.setStyle({
		// 	// tabBarButtonColor: '#0d0d0d',
	 //        tabBarSelectedButtonColor: this.props.themeColor,
	 //        tabBarBackgroundColor: this.props.themeMode === 'dark' ? "#2d2d2d" : null,
	 //        // navigationBarColor: this.props.themeMode === 'dark' ? "#2d2d2d" : null,
	 //        navBarButtonColor: this.props.themeColor
		// })
	}

	itemsLoadedHandler () {
		this.props.onGetItems();
		this.setState(prevstate => {
			return {
				...prevstate,
				itemsLoaded: true
			}
		});
		return (
			<Text>Returned...</Text>
		);
		uiStopLoading();
	}

	toggleAllModal = () => {
		this.setState(prevState => {
			return {
				...prevState,
				modals:{
					...prevState.modals,
					all:{
						...prevState.modals.all,
						isVisible:false
					}
				}
			}
		})
	}

	// toggleInboundModal = () => {
	// 	this.setState(prevState => {
	// 		return {
	// 			...prevState,
	// 			modals:{
	// 				...prevState.modals,
	// 				inbound:{
	// 					...prevState.modals.inbound,
	// 					isVisible: !this.state.modals.inbound.isVisible
	// 				}
	// 			}
	// 		}
	// 	})
	// }

	toggleNewItemModal = () => {
		this.props.navigator.push({
		  screen: 'addItem', // unique ID registered with Navigation.registerScreen
		  title: "Add Item", // navigation bar title of the pushed screen (optional)
		  // subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
		  // titleImage: require('../../img/my_image.png'), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
		  // passProps: {}, // Object that will be passed as props to the pushed screen (optional)
		  animated: true, // does the push have transition animation or does it happen immediately (optional)
		  animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
		  // backButtonTitle: undefined, // override the back button title (optional)
		  // backButtonHidden: false, // hide the back button altogether (optional)
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
				navBarTextColor: this.props.theme[this.props.themeMode].navBarTextColor,
				navBarButtonColor: this.props.theme[this.props.themeMode].navBarButtonColor,
				navBarBackgroundColor: this.props.theme[this.props.themeMode].navBarBackgroundColor,
			},
		  navigatorButtons: {
		  	rightButtons: [
		  		{
		  			id: "sideMenu",
		  		}
		  	]
		  }, // override the nav buttons for the pushed screen (optional)
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
	}

	// toggleOutboundModal = () => {
	// 	this.setState(prevState => {
	// 		return {
	// 			...prevState,
	// 			modals:{
	// 				...prevState.modals,
	// 				outbound:{
	// 					...prevState.modals.outbound,
	// 					isVisible: !this.state.modals.outbound.isVisible
	// 				}
	// 			}
	// 		}
	// 	})
	// }

	onAddItemOverlayToggleHandler = () => {
		let modal;
		if(this.state.selectedIndex === 0){
			this.setState(prevState => {
				return {
					...prevState,
					modals:{
						...prevState.modals,
						all:{
							...prevState.modals.all,
							isVisible: true
						}
					}
				}
			});
		}else if(this.state.selectedIndex === 1){
			this.setState(prevState => {
				return {
					...prevState,
					modals:{
						...prevState.modals,
						inbound:{
							...prevState.modals.inbound,
							isVisible: true
						}
					}
				}
			});
		}else if(this.state.selectedIndex === 2){
			this.setState(prevState => {
				return {
					...prevState,
					modals:{
						...prevState.modals,
						outbound:{
							...prevState.modals.outbound,
							isVisible: true
						}
					}
				}
			});
		}
	}

	updateInputState(key, val){
		this.setState( prevState => {
			return {
				...prevState,
				modals:{
					...prevState.modals,
					addItem: {
						...prevState.modals.addItem,
						[key]: {
							...prevState.modals.addItem[key],
							value: val
						}
					}
				}
			}
		})
	}

	validate(title, amount){
		// console.log("validating...", title, amount);
		return 1;
	}

	addItem(title, amount, description, image, type){
		if(
			this.validate(
				this.state.modals.inbound.title.value,
				this.state.modals.inbound.amount.value,
			)
		)
		{
			this.props.onAddItem(
				this.state.modals.inbound.title.value,
				this.state.modals.inbound.amount.value,
				this.state.modals.inbound.description.value,
				this.state.modals.inbound.image,
				"inbound"
			);
		}
	}

	filterInboundItems(items){
		return items.type === "inbound";
	}

	filterOutboundItems(items){
		return items.type === "outbound";
	}
	// addOutboundHandler(key){
	// 	// if(!this.state.modals.inbound.image.uri){
	// 	// 	import 
	// 	// }
	// 	// let obj = {
	// 	// 	name: this.state.modals.inbound.title.value,
	// 	// 	subtitle: this.state.modals.inbound.amount,
	// 	// 	image: this.state.modals.inbound.image.uri ? this.state.modals.inbound.image.uri : 
	// 	// }
	// 	if(
	// 		flowData = this.validate(
	// 			this.state.modals.outbound.title.value,
	// 			this.state.modals.outbound.amount.value,
	// 			this.state.modals.outbound.image.uri
	// 		)
	// 	)	this.onAddOutboundItem(flowData, "outbound");
	// }

	// keyExtractor = (item, index) => index.toString()

	// renderItem = ({ item }) => (
	//   <ListItem
	//     title={item.name}
	//     subtitle={item.subtitle}
	//     leftAvatar={item.avatar}
	//   />
	// )

	onNavigatorEvent = event => {
		if(event.id === "refreshItems") this.props.onGetItems()
		else if(event.id === "addItem") this.toggleNewItemModal()	
	}

	onDeleteItem = key => {
		console.log('key: ', key);
		this.props.onDeleteItem(key);
	}

	render() {
		let content = 
			this.props.isLoading ? 
			<View 
				style={{
					backgroundColor:"transparent",
					flex:1,
					marginTop:100
					// justifyContent:"center"
				}}
			>
				<ActivityIndicator /> 
			</View>
			:
			<ItemList 
				data={
					this.state.selectedIndex == 0 ?
					this.props.items 
					: 
					this.state.selectedIndex == 1 ?
					this.props.items.filter(this.filterInboundItems)
					:
					this.state.selectedIndex == 2 ? 
					this.props.items.filter(this.filterOutboundItems)
					:
					null
				}
				onDeleteItem={this.onDeleteItem}
				isLoading={this.props.isLoading}
			/>  
		let addItemInitialButton = this.props.items.length > 0 ? 
		null
		:
		(
			<Avatar
				activeOpacity={1}
				rounded
				size="large"
				icon={{
					size:40,
					name:'add',
					// color: 'green'
				}}
				overlayContainerStyle={{
					backgroundColor:"#00294F",
					elevation:10
				}}
				containerStyle={{
					position:'absolute',
					right:50,
					bottom:60,
				}}
				onPress={() => this.toggleNewItemModal()}
				onLongPress={() => this.toggleNewItemModal()}
			/>
		)	


		// if(this.props.isLoading){
		// 	content = (
		// 		<ActivityIndicator />
		// 	);
		// }else{
		// 	// switch(this.state.selectedIndex) {
		// 	// 	case 0:
		// 	// 		if(this.state.itemsLoaded){
		// 	// 			content = (
		// 	// 				<ItemList data={this.props.items} />
		// 	// 			  );

		// 	// 		}else{
		// 	// 			content = (
		// 	// 				<Button title="getlist" onPress={() => this.itemsLoadedHandler()}/>
		// 	// 				//find a way to order correctly when date exists
		// 	// 			);
		// 	// 		}
		// 	// 		break;
		// 	// 	case 1:
		// 	// 		content = (
		// 	// 			<ItemList data={this.props.items.filter(this.filterInboundItems)} />

		// 	// 		);
		// 	// 		break;
		// 	// 	case 2:
		// 	// 		content = (
		// 	// 			<OutboundList data={this.props.items.filter(this.filterOutboundItems)} onItemSelected={this.itemSelectedeHandler} />
		// 	// 			<ItemList data={this.props.items.filter(this.filterOutboundItems)} />
		// 	// 		);
		// 	// 		break;
		// 	// }
		// }
		return (
			<ImageBackground style={{width:"100%", flex:1}} source={img2}>
				<View style={styles.overlayTransparent}></View> 
				<View style={[styles.dashboardContainer, {
					// backgroundColor:"#2d2d2d",
				}]}>
					{
						/*<ButtonGroup
							Component={TouchableWithoutFeedback}
							onPress={this.updateIndex}
							buttonStyle={{borderRightWidth:0,backgroundColor:'transparent'}}
							selectedIndex={this.state.selectedIndex}
							innerBorderStyle={{width:0}}
							buttons={["All", "Inbound", "Outbound"]}
							// buttons={["All", "Inbound", "Outbound"]}
							containerStyle={{height:50,borderWidth:0,backgroundColor:"transparent"}}
							// disabledStyle={{}}
							selectedButtonStyle={{backgroundColor:"transparent",borderBottomWidth:1, borderColor:"grey"}}
							textStyle={{color:"darkgrey", fontSize:13}}
							selectedTextStyle={{color:"black",fontWeight:"bold"}}
						/>*/
					}
					<ButtonsGroup selectedIndex={this.state.selectedIndex} onPress={this.updateIndex} data={this.props.items} />
					<View style={{flex:1}}>
						{content}
						{addItemInitialButton}
					</View>
				</View>
			</ImageBackground>
		);
	}
};



// const Dashboard = () => ( PlaceholderContent={<ActivityIndicator />}
// 	<View style={styles.style}>
// 		<Text>Test</Text>
// 	</View>
// );



const styles = StyleSheet.create({
	overlayTransparent:{
		position:"absolute", 
		width:"100%", 
		height:"100%", 
		flex:1, 
		backgroundColor:"black", 
		opacity:0.9
	},
	dashboardContainer: {
		flex: 1,	
	},
	inboundContainer: {

	},
	outboundContainer: {

	},
	style: {
		flex: 2,
		borderColor:"gold",
		borderWidth:1,
		backgroundColor: "maroon"
	},
	text: {
		color:"gold"
	},
	placeholder: {
		borderWidth: 1,
		borderColor: "black",
		backgroundColor: "lightgrey",
		width: "80%",
		// flex:2,
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center",
		height: 150,
	},
	previewImage:{
		width:"100%",
		height: "100%"
	},
	listContainer:{
		width:"100%",
		borderWidth:1,
		// borderColor:"red"
	}
});

const mapStateToProps = (state) => {
	return {
		isLoading: state.ui.isLoading,
		items: state.items.items,
		// inboundItems: state.inbound.inboundItems,
		// outboundItems: state.outbound.outboundItems,
		theme: state.settings.theme,
		themeMode: state.settings.themeMode
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		//add an argument to return only inbound or outbound type or both if non given.
		onGetItems: () => dispatch(getItems()),
		onAddItem: (title, amount, description, image, type) => dispatch(addItem(title, amount, description, image, type)),
		onDeleteItem: (key) => dispatch(deleteItem(key)),
		uiStartLoading: () => dispatch(uiStartLoading()),
		uiStopLoading: () => dispatch(uiStopLoading()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
