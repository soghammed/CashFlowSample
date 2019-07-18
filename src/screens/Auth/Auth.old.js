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
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'; 
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../Utility/Validation/validation';
import { tryAuth, authAutoSignIn } from '../../store/actions/index';
import { Button, ThemeProvider, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FAwesome from 'react-native-vector-icons/FontAwesome'; 
// import Avatar from '../../components/UI/Avatar/Avatar';

class AuthScreen extends Component {

	state = {
		viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
		authMode: "signup",
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
	}

	componentWillUnmount() {
		Dimensions.removeEventListener("change", this.updateStyles);
	}

	switchAuthModeHandler = () => {
		console.log('running authmdeicon update');
		this.setState(prevState => {
			return {
				viewMode: prevState.authMode === "login" ? "signup" : "login"
			};
		});
	}

	authHandler() {
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
			const equalValue = this.state.controles[equalControl].value;
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
			<View style={styles.submitButtonContainer}>
				<Button
					title={this.state.authMode === "login" ? " Sign In" : " Submit"}
					type="outline"
					icon={
						<Icon
							name="md-log-in"
							size={24}
							color="#26A69A"
						/>
					}
					iconRight={true}
					buttonStyle={[styles.submitButton, {borderColor:"#86939E"}]}
					titleStyle={{marginRight:10, color:"grey"}}
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
		const authModeIcon = this.state.authMode === "login" 
		? (
			<FAwesome 
				name="user-plus" 
				size={30} 
				style={styles.authModeIcon}
				onPress={() => console.log('clicked')}
			/>
		)
		:
		 (
		 	<Icon 
		 		name="md-log-in"
		 		size={30}
		 		style={styles.authModeIcon}
		 		onPress={this.switchAuthModeHandler}
		 	/>
		 );
			// <Icon.Button
			// 	name="md-map"
			// 	backgroundColor="#2BBBAD"
			// 	onPress={() => console.log('loginclicked')}
			// >
			// 	Login
			// </Icon.Button>
		if(this.state.authMode === "signup"){
			confirmPasswordControl = (
				<View 
					style={
						this.state.viewMode === "portrait" || this.state.authMode === "login"
						? styles.portraitPasswordContainer
						: styles.landscapePasswordContainer
					}
				>
					<DefaultInput
						value={this.state.controls.confirmPassword.value}
						placeholder="Confirm Password"
						placeholderTextColor="grey"
						valid={this.state.controls.confirmPassword}
						onChangeText={(val) => this.updateInputState("confirmPassword", val)}
						inputStyle={styles.textInputDefaults}
						leftIcon={
							<Icon
								name="md-lock"
								size={24}
								color="#26A69A"
							/>
						}
					/>
				</View>
			);
		}
		if(this.state.viewMode === "portrait"){
			{/* heading text sync accross screens using dedicated component, for last thing */}
		}
		if(this.state.isLoading){
			submitButton = <ActivityIndicator />
		}
		return (
			<View>
				<View style={styles.container}>
				
					<TouchableOpacity>
			
						{authModeIcon}
				
					</TouchableOpacity>
						
					<View style={styles.innercontainer}>
						<Avatar
							size="xlarge"
							rounded
							source={pic1}
						/>
						{/*dismissing keyboard if area is touched*/}
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							{/*Text input view here */}
							<View style={styles.inputContainer}>
								<DefaultInput 
									value={this.state.controls.email.value}
									leftIcon={
										<Icon
											name="md-mail"
											size={24}
											color='#29B3A6'
										/>
									}
									inputStyle={styles.textInputDefaults}
									placeholder="Email Address"
									placeholderTextColor="grey"
									valid={this.state.controls.email.valid}
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
											? styles.portraitPasswordContainer
											: styles.landscapePasswordContainer
										}
									>
										<DefaultInput
											leftIcon={
												<Icon
													name="md-lock"
													size={24}
													color="#26A69A"
												/>
											}
											inputStyle={styles.textInputDefaults}
											value={this.state.controls.password.value}
											placeholder=" Password"
											placeholderTextColor="grey"
											valid={this.state.controls.password.valid}
											onChangeText={(val) => this.updateInputState("password", val)}
										/>
									</View>
									{confirmPasswordControl}
								</View>
							</View>
							{/*Text input end view here*/}
						</TouchableWithoutFeedback>
						{/*dismissing keyboard if area is touched END*/}
						{submitButton}
					</View>

				</View>
			</View>
		);
	}

}


const styles = StyleSheet.create({
	container: {
		flex:1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		borderColor:"red",
		borderWidth:1,
		zIndex:1,
	},
	innercontainer:{
		// flex:1,
		// justifyContent:"center",
		borderColor:"gold",
		borderWidth:1,
		// width:"100%",
		alignItems: "center",
		zIndex:1
	},
	authModeIcon:{
		flex:1,
		color:"#29B3A6",
		position: 'absolute',
		zIndex:9,
		right: 20,
		top: 20,
		bottom:0,
		// justifyContent:'flex-end'
	},
	inputContainer: {
		width:"80%",
		top:20
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
		// flex: 1,
		// width: "100%",
		// zIndex:1,
		// backgroundColor: "#540032"
	},
	submitButton: {
		alignItems:"center",
		top: 60
	},
	// submitButtonContainer: {
	// 	borderColor:"gold",
	// 	borderWidth:1,
	// 	top:80
	// }
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