import { 
	Text,
	View, 
	ImageBackground, 
	StyleSheet, 
	Dimensions, 
	TextInput, 
	TouchableOpacity, 
	ActivityIndicator,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import pic from '../../assets/img/tab2.jpg';
import pic1 from '../../assets/img/tab1.jpg';
import sky from '../../assets/img/grey.jpg';
import img1 from '../../assets/img/authBackground.jpg';
import img2 from '../../assets/img/authBackground2.jpg';
import img3 from '../../assets/img/authBackground2.png';
import img4 from '../../assets/img/authBackground3.png';

import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'; 
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../Utility/Validation/validation';
import { tryAuth, authAutoSignIn } from '../../store/actions/index';
import { Button, ThemeProvider, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FAwesome from 'react-native-vector-icons/FontAwesome'; 
// import Home from '../Navigation/Home';
// import Avatar from '../../components/UI/Avatar/Avatar';

class AuthScreen extends Component {

	state = {
		viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
		authMode: "login",
		controls: {
			email: {
				value: "",
				valid: false,
				validationRules: {
					isEmail: true
				},
				touched: false,
			},
			password: {
				value: "",
				valid: false,
				validationRules: {
					minLength: 6
				},
				touched: false
			},
			confirmPassword: {
				value: "",
				valid: false,
				validationRules: {
					equalTo: 'password'
				},
				touched: false
			}
		},		
	}

	constructor(props) {
		super(props);

		Dimensions.addEventListener("change", this.updateStyles);
	}

	componentDidMount() {
		this.props.onAutoSignIn();
		// console.log(Home());
	}

	componentWillUnmount() {
		Dimensions.removeEventListener("change", this.updateStyles);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				authMode: prevState.authMode === "login" ? "signup" : "login"
			};
		});
	}

	authHandler = () => {
		console.log(this.state);
		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value,
		};
		this.props.onTryAuth(authData, this.state.authMode);
	}

	updateStyles = (dims) => {
		this.setState({
			viewMode: dims.window.height > 500 ? "portrait" : "landscape"
		});
	}

	updateAuthModeIcon() {
		this.setState(prevState => {
			return {
				...prevState,
				authMode: prevState.authMode === "login" ? "signup" : "login"
			};
		})
	}

	updateInputState = (key, value) => {
		let connectedValue = {};
		//if its key is confirm password and has equalTo as rule
		if(this.state.controls[key].validationRules.equalTo){
			const equalControl = this.state.controls[key].validationRules.equalTo;
			const equalValue = this.state.controls[equalControl].value;
			connectedValue = {
				...connectedValue,
				equalTo: equalValue
			};
		}
		if(key === 'password') {
			connectedValue = {
				...connectedValue,
				equalTo: value
			};
		}
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					confirmPassword: {
						...prevState.controls.confirmPassword,
						valid: key === 'password'
						? validate(
							prevState.controls.confirmPassword.value,
							prevState.controls.confirmPassword.validationRules,
							connectedValue)
						: prevState.controls.confirmPassword.valid
					},
					[key]: {
						...prevState.controls[key],
						value: value,
						valid: validate(value, prevState.controls[key].validationRules, connectedValue),
						touched: true,
					}
				}
			}
		});
	}

	render() {
		let confirmPasswordControl = null;
		let submitButtonText = this.state.authMode;
		let submitButton = (
			<View style={this.state.viewMode == "portrait" ? styles.submitButtonPortraitContainer : styles.submitButtonLandscapeContainer}>
				<Button
					title={this.state.authMode === "login" ? " Sign In" : " Submit"}
					titleStyle={{marginRight:10, color:"white"}}
					type="clear"
					icon={{
						type: "font-awesome",
						name:"sign-in",
						size: 22,
						color: "white"
					}}					
					iconRight={true}
					buttonStyle={[styles.submitButton, {borderColor:"#86939E"}]}
					disabled={!this.state.controls.confirmPassword.valid && this.state.authMode === "signup" || !this.state.controls.email.valid || !this.state.controls.password.valid}
					onPress={this.authHandler}
					loading={this.props.isLoading ? true : false}
				/>
				{/*<ButtonWithBackground 
					style={styles.submitButton}
					title="Submit"
					color="#26A69A"
					onPress={this.authHandler}
					disabled={!this.state.controls.confirmPassword.valid && this.state.authMode === "signup" || !this.state.controls.email.valid || !this.state.controls.password.valid}>
					Submit
				</ButtonWithBackground> */}
			</View>	
		);
		const authModeIcon = this.state.authMode === "login" ? 
			(
				<Avatar 
					rounded
					size="medium"
					icon={{
						type: 'font-awesome',
						name: "user-plus",
						color: "white",
						size: 22
					}}
					overlayContainerStyle={styles.authModeIcon}
					containerStyle={styles.authModeIconContainer}
					onPress={this.switchAuthModeHandler}
					onLongPress={this.switchAuthModeHandler}
				/>
			)
			:
			(
				<Avatar 
					rounded
					size="medium"
					icon={{
						type: 'font-awesome',
						name: "sign-in",
						color: "white",
						size: 22
					}}
					overlayContainerStyle={styles.authModeIcon}
					containerStyle={styles.authModeIconContainer}
					onPress={this.switchAuthModeHandler}
					onLongPress={this.switchAuthModeHandler}
				/>
			)
			// (
			// 	<TouchableOpacity  style={styles.authModeIconContainer}>
			// 		<FAwesome 
			// 			name="user-plus" 
			// 			size={30} 
			// 			style={styles.authModeIcon}
			// 			onPress={this.switchAuthModeHandler}
			// 		/>
			// 	</TouchableOpacity>
			// )
			// :
			//  (
			//  	<TouchableOpacity style={styles.authModeIconContainer}>
			// 	 	<Icon 
			// 	 		name="md-log-in"
			// 	 		size={30}
			// 	 		style={styles.authModeIcon}
			// 	 		onPress={this.switchAuthModeHandler}
			// 	 	/>
			// 	</TouchableOpacity>
			//  );

		if(this.state.authMode === "signup"){
			confirmPasswordControl = (
				<View 
					style={
						this.state.viewMode === "portrait" || this.state.authMode === "login"
						? styles.portraitPasswordWrapper
						: styles.landscapePasswordWrapper
					}
				>
					<DefaultInput
						value={this.state.controls.confirmPassword.value}
						placeholder="Confirm Password"
						placeholderTextColor="grey"
						errorStyle={{backgroundColor:'#f9c0c0',padding:5}}
						errorMessage={!this.state.controls.confirmPassword.valid && this.state.controls.confirmPassword.touched ? "Passwords not matching, try again.." : ""}
						onChangeText={(val) => this.updateInputState("confirmPassword", val)}
						inputStyle={styles.textInputDefaults}
						leftIcon={
							<Icon
								name="md-lock"
								size={24}
								color="white"
							/>
						}
					/>
				</View>
			);
		}
		if(this.state.viewMode === "portrait"){
			{/* heading text sync accross screens using dedicated component, for last thing */}
		}
		return (
			<ImageBackground style={{width:"100%", flex:1}} source={img1}>
					<View style={styles.overlayTransparent}></View>
					<View style={styles.container}>
						{/*<KeyboardAvoidingView style={{flex:1}} behavior="padding">*/}
							{authModeIcon}

							<View style={styles.innercontainer}>
								{/*<Avatar
									size="xlarge"
									rounded
									source={pic1}
								/>*/}
								{/*dismissing keyboard if area is touched*/}
								<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
									{/*Text input view here */}
									<View style={this.state.viewMode == "portrait" ? styles.inputContainer : styles.inputLandscapeContainer}>
										<DefaultInput 
											value={this.state.controls.email.value}
											leftIcon={
												<Icon
													name="md-mail"
													size={24}
													color='white'
												/>
											}
											inputStyle={styles.textInputDefaults}
											placeholder="Email Address"
											placeholderTextColor="grey"
											errorStyle={{backgroundColor:'#f9c0c0',padding:5}}
											errorMessage={!this.state.controls.email.valid && this.state.controls.email.touched ? "Incorrect email address.." : ""}
											onChangeText={(val) => this.updateInputState("email", val)}
										/>

										<View 
											style={
												this.state.viewMode === "portrait" || this.state.authMode === "login"
												? styles.portraitPasswordContainer
												: styles.landscapePasswordContainer
											}
										>
											<View 
												style={
													this.state.viewMode === "portrait" || this.state.authMode === "login"
													? styles.portraitPasswordWrapper
													: styles.landscapePasswordWrapper
												}
											>
												<DefaultInput
													leftIcon={
														<Icon
															name="md-lock"
															size={24}
															color="white"
														/>
													}
													inputStyle={styles.textInputDefaults}
													value={this.state.controls.password.value}
													placeholder=" Password"
													placeholderTextColor="grey"
													errorStyle={{backgroundColor:'#f9c0c0',padding:5}}
													errorMessage={!this.state.controls.password.valid && this.state.controls.password.touched ? "Incorrect password.." : ""}
													onChangeText={(val) => this.updateInputState("password", val)}
												/>
											</View>
											{confirmPasswordControl}
										</View>
									</View>
									{/*Text input end view here*/}
								</TouchableWithoutFeedback>
								{submitButton}
							</View>
						{/*</KeyboardAvoidingView> */}

					</View>
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
		opacity:0.8
	},
	container: {
		flex:1,
		flexDirection: "column",
		// justifyContent: "center",
		// alignItems: "center",
		borderColor:"red",
		// borderWidth:1,
		backgroundColor:"transparent"
	},
	innercontainer:{
		flex:1,
		justifyContent:"center",
		// borderColor:"gold",
		// borderWidth:1,
		width:"100%",
		alignItems: "center",
		// zIndex:1
	},
	authModeIconContainer:{
		flex:-1,
		flexDirection:"row",
		// color:"#29B3A6",
		justifyContent:"flex-end",
		position: 'absolute',
		zIndex:19,
		right:25,
		top:25,
		// position: 'absolute',
		// right: 20,
		// top: 20,
		// bottom:0,
		// justifyContent:'flex-end'
	},
	authModeIcon:{
		backgroundColor:"#00294F",
	},
	inputContainer: {
		width:"80%",
		top:-150, 
		// borderColor:"blue",
		// borderWidth:1 
	},
	inputLandscapeContainer: {
		width:"80%",
		top:-20, 
		// borderColor:"blue",
		// borderWidth:1 
	},
	textInput: {
		borderColor: "gold",
		borderBottomWidth:2,
	},
	textInputDefaults:{
		color: "#eee",
		paddingLeft: 15
	},
	landscapePasswordContainer:{
		flexDirection:"row",
		justifyContent: "space-between",
	},
	portraitPasswordContainer:{
		flexDirection: "column",
		justifyContent: "flex-start"
	},
	landscapePasswordWrapper:{
		width:"45%",
	},
	portraitPasswordWrapper: {
		width:"100%",
	},
	bgImage: {
		flex: 1,
		width: "100%",
		zIndex:1,
		// backgroundColor: "#540032"
	},
	submitButton: {
		alignItems:"center",
		// top: 60
	},
	submitButtonPortraitContainer: {
		backgroundColor:"#00294F",
		top:-50, 
	},
	submitButtonLandscapeContainer: {
		backgroundColor:"#00294F",
		top: 60, 
	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
		onAutoSignIn: () => dispatch(authAutoSignIn())
	};
}


export default connect(mapStateToProps,mapDispatchToProps)(AuthScreen);