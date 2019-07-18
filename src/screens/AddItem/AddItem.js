import React, {Component} from 'react';
import { View, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Text, ImageBackground } from 'react-native';
import {Overlay, Button, Avatar} from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { addItem } from '../../store/actions/index';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { uiStartLoading, uiStopLoading } from '../../store/actions/index';
import img1 from '../../assets/img/authBackground.jpg';
import img2 from '../../assets/img/authBackground2.jpg';
import img3 from '../../assets/img/authBackground2.png';
import img4 from '../../assets/img/authBackground3.png';

// import { Switch } from 'react-native-switch';

class AddItem extends Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.initialState();
	}

	initialState(){
		this.setState({
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
			type: "inbound"
		});
	}
	updateInputState(key, val){
		switch(key){
			case "type":
				this.setState({ type: val });
				console.log(this.state);
				break;

			default:
				this.setState( prevState => {
					return {
						...prevState,
						[key]: {
							...prevState[key],
							value: val,
							// touched: true,
							// valid: true
						}
					}
				});
				break;
		}
	}

	addItem(title, amount, description, image, type){
		if(type != null){
			this.props.onAddItem(title, amount, description, image, type);
			this.resetFields();
			this.props.navigator.pop();
		}
	}

	pickImageHandler = () => {
		ImagePicker.showImagePicker({title: "Pick an Image", maxWidth:800, maxHeight:600}, res => {
			if(res.didCancel) {
				console.log("User Cancelled!");
			}else if(res.error) {
				console.log("Error", res.error);
			}else {
				this.setState(prevState => {
					console.log('prevstate', prevState);
					return {
						...prevState,
						image: {
							uri: res.uri,
							base64: res.data
						}
					}
				});
			}
		})
	}

	resetFields(){
		this.initialState();
		// this.imagePicker.reset();
	}

	updateType(type) {
		this.props.onUiStartLoading();
		this.setState(prevState => {
			return {
				...prevState,
				type: type 
			}
		});
		this.props.onUiStopLoading();
	}
	render() {
		let ImagePlaceholderIcon = this.state.image.uri ? 
			null 
			: 
			<Avatar
				rounded
				size={100}
				icon={{
					name: "camera",
					// color: "red"
				}}
				overlayContainerStyle={{backgroundColor: this.state.type == "inbound" ? "green" : "darkred"}}
				containerStyle={{
					// backgroundColor:"red",
					// borderColor:"gold", 
					// borderWidth:1,
					marginTop:25
				}}
				onPress={() => this.pickImageHandler()}
			/>
		let addItemButton = this.props.isLoading ? 
			<ActivityIndicator /> 
			: 
			(
				<View style={{flex:1, flexDirection:"row", justifyContent:"center", marginTop:0, padding:40}}>
					<Avatar
						activeOpacity={1}
						rounded
						size={60}
						icon={{
							name:'close',
							// color: 'orange'
						}}
						overlayContainerStyle={{backgroundColor: "#00294F"}}
						containerStyle={{
							marginRight:50,
							elevation:10,
							// backgroundColor: "red",
						}}
						onPress={() => this.props.navigator.pop()}
						onLongPress={() => this.props.navigator.pop()}
					/>

					<Avatar
						activeOpacity={1}
						rounded
						size={60}
						icon={{
							name:'check',
							// color: 'orange'
						}}
						overlayContainerStyle={{
							backgroundColor: this.state.type == "inbound" ? 'green' : 'darkred',
							opacity: 
								this.state.title.value
								&& this.state.amount.value ?
								// && this.state.image.uri ?
								1
								:
								0.3,
							// backgroundColor: 
							// 	this.state.title.value 
							// 	&& this.state.amount.value
							// 	&& this.state.image.uri
							// 	&& this.state.type == "inbound" ? 
							// 	'green' 
							// 	: 
							// 	this.state.title.value 
							// 	&& this.state.amount.value
							// 	&& this.state.image.uri
							// 	&& this.state.type == "outbound" ? 
							// 	'darkred'
							// 	:
							// 	'#E3E6E8',
							elevation:10 
						}}
						containerStyle={{
							// marginRight:50,
							// borderWidth:1,
							// backgroundColor: this.state.type == "inbound" ? "green" : "red"
							// backgroundColor: this.state.type === "inbound" ? "lightgreen" : "grey",
						}}
						// onPress={() => this.updateType("inbound") }
						// onLongPress={() => this.updateType("inbound") }
						onPress={
							this.state.title.value 
							&& this.state.amount.value?
							// && this.state.image.uri ?
							() => {
								this.addItem(
									this.state.title.value,
									this.state.amount.value,
									this.state.description.value,
									this.state.image,
									this.state.type
								)
							}
							:
							null
						}
						onLongPress={
							this.state.title.value 
							&& this.state.amount.value?
							// && this.state.image.uri ?
							() => {
								this.addItem(
									this.state.title.value,
									this.state.amount.value,
									this.state.description.value,
									this.state.image,
									this.state.type
								)
							}
							:
							null
						}
					/>
				</View>
			);	
		let typeToggleView = this.props.isLoading ?
			<ActivityIndicator /> 
			:
			<View style={{flex:1, flexDirection:"row"}}>
				<View style={{justifyContent:"center", marginLeft:12}}>
					<Text style={{fontWeight:"bold", color: this.state.type == "inbound" ? "green" : "darkred"}}>{this.state.type == "inbound" ? "Inbound":"Outbound"}</Text>
				</View>
				<View style={{flex:1, flexDirection:"row", borderColor:"gold", marginTop:10,marginBottom:5, padding:0, justifyContent:"flex-end"}}>
					<Avatar
						activeOpacity={1}
						rounded
						size="small"
						icon={{
							size:20,
							name:'trending-up',
							// color: 'orange'
						}}
						overlayContainerStyle={{backgroundColor: 'green', opacity: this.state.type == "inbound" ? 1 : 0.2}}
						containerStyle={{
							marginRight:10,
							// borderWidth:1,
							// borderColor:"gold",
							// backgroundColor: this.state.type === "inbound" ? "lightgreen" : "grey",
						}}
						onPress={() => this.updateType("inbound") }
						onLongPress={() => this.updateType("inbound") }
					/>
					<Avatar
						activeOpacity={1}
						rounded
						size="small"
						icon={{
							size:20,
							name:'trending-down',
						}}
						overlayContainerStyle={{backgroundColor: 'darkred', opacity: this.state.type == "outbound" ? 1 : 0.2}}
						// containerStyle={{
						// 	backgroundColor: this.state.type === "outbound" ? "red" : "grey"
						// }}
						onPress={() => this.updateType("outbound")}
						onLongPress={() => this.updateType("outbound")}
					/>
				</View>
			</View>
			console.log('rerender');
		return (
			<ImageBackground style={{width:"100%", flex:1}} source={img1}>
				<View style={styles.overlayTransparent}></View> 
				<ScrollView style={{flex:1, padding:20, paddingTop:0}}>
					{typeToggleView}
					<DefaultInput
						value={this.state.title.value}
						leftIcon={
							<Icon
								name="md-star"
								size={24}
								color="gold"
								// color={this.state.type == "inbound" ? 'green' : 'darkred'}
							/>
						}
						// label="Title"
						// labelStyle={{}}
						// inputStyle={styles.inputStyleDefault}
						containerStyle={{marginBottom:20}}
						inputContainerStyle={{borderColor:"navy", borderBottomWidth:0, elevation:5, borderRadius:8}}
						inputStyle={{paddingLeft:10, color:"white"}}
						placeholder="Title"
						placeholderTextColor="#eee"
						errorStyle={{backgroundColor:'#f9c0c0',padding:5}}
						errorMessage={!this.state.title.valid && this.state.title.touched ? "Incorrect Title.." : ""}
						onChangeText={(val) => this.updateInputState("title", val)}
					/>
					<DefaultInput 
						value={this.state.amount.value}
						leftIcon={
							<Icon
								name="md-pricetag"
								size={24}
								color={this.state.type == "inbound" ? 'green' : 'darkred'}
								// color='#29B3A6'/
							/>
						}
						containerStyle={{marginBottom:20}}
						inputContainerStyle={{borderColor:"navy", borderBottomWidth:0, elevation:5, borderRadius:8}}
						inputStyle={{paddingLeft:10, color:"white"}}
						placeholder="Amount"
						placeholderTextColor="#eee"
						errorStyle={{backgroundColor:'#f9c0c0',padding:5}}
						errorMessage={!this.state.amount.valid && this.state.amount.touched ? "Incorrect amount.." : ""}
						onChangeText={(val) => this.updateInputState("amount", val)}
					/>
					<DefaultInput 
						value={this.state.description.value}
						leftIcon={
							<Icon
								name="md-document"
								size={24}
								color={this.state.type == "inbound" ? 'green' : 'darkred'}
								// color='#29B3A6'
							/>
						}
						containerStyle={{marginBottom:20}}
						inputContainerStyle={{borderColor:"navy", borderBottomWidth:0, elevation:5, borderRadius:8}}
						inputStyle={{paddingLeft:12, color:"white"}}
						placeholder="Description"
						placeholderTextColor="#eee"
						onChangeText={(val) => this.updateInputState("description", val)}
					/>
					<View style={styles.bottomHalfContainer}>
						<View style={[styles.placeholder]}>
							{ImagePlaceholderIcon}
							<Image source={{ uri: this.state.image.uri }} style={styles.previewImage} />
						</View>
						{/*<View style={{margin:8}}>
							<Button title="Choose an image" type="clear" onPress={() => this.pickImageHandler()}/>
						</View>*/}
					</View>
					{addItemButton}
				</ScrollView>
			</ImageBackground>
		);
	}
}



const styles = StyleSheet.create({
	overlayTransparent:{
		position:"absolute", 
		width:"100%", 
		height:"100%", 
		flex:1, 
		backgroundColor:"black", 
		opacity:0.9
	},
	bottomHalfContainer: {
		alignItems:"center",
		width:"100%"
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
		elevation:5,
		borderRadius:10,
		// borderWidth: 1,
		// borderColor: "black",
		// backgroundColor:this.props.themeMode == 'dark' ? '#2d2d2d' : 'white',
		width: "93%",
		height:150,
		// flex:1,
		// flexDirection:"row",
		// justifyContent:"center",
		alignItems:"center",
		// marginTop:10,
	},
	previewImage:{
		width:"100%",
		height: "100%",
		borderRadius:10,
	},
	listContainer:{
		width:"100%",
		borderWidth:1,
		borderColor:"red"
	},
	inactiveType:{
		opacity:0.5	
	},
	activeType:{
		opacity:1
	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading,
		theme: state.settings.theme,
		themeMode:state.settings.themeMode
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAddItem: (title, amount, description, image, type) => dispatch(addItem(title, amount, description, image, type)),
		onUiStartLoading: () => dispatch(uiStartLoading()),
		onUiStopLoading: () => dispatch(uiStopLoading()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);