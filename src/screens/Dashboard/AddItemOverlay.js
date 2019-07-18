import React, {Component} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {Overlay, Button} from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

const addItemOverlay = (props) => (

	// <Overlay
	// 	isVisible={props.isVisible}
	// 	onBackdropPress={props.onBackdropPress}
	// 	onRequestClose={props.onRequestClose}
	// 	animate="slide"
	// 	height={500}>
		<View style={{flex:1}}>
			{/*<View>
				<Icon
					name="md-close-circle"
					size={30}
					style={{position:"absolute", right:0,borderWidth:1,borderColor:"red"}}
					onPress={this.toggleInboundModal}
				/>
			</View>*/}
			<DefaultInput
				value={props.titleValue}
				leftIcon={
					<Icon
						name="md-star"
						size={24}
						color='gold'
					/>
				}
				label="Title"
				labelStyle={{}}
				// inputStyle={styles.inputStyleDefault}
				placeholder="Title"
				placeholderTextColor="#eee"
				errorStyle={{backgroundColor:'#f9c0c0',padding:5}}
				errorMessage={!props.titleValid && props.titleTouched ? "Incorrect Title.." : ""}
				onChangeText={() => props.onChangeText("title", val)}
			/>
			<DefaultInput 
				value={props.amountValue}
				leftIcon={
					<Icon
						name="md-pricetag"
						size={24}
						color='#29B3A6'
					/>
				}
				// inputStyle={styles.inputStyleDefault}
				label="Amount"
				placeholder="Amount"
				placeholderTextColor="#eee"
				errorStyle={{backgroundColor:'#f9c0c0',padding:5}}
				errorMessage={!props.amountValid && props.amountTouched ? "Incorrect amount.." : ""}
				onChangeText={() => props.onChangeText("amount", val)}
			/>
			<DefaultInput 
				value={props.descriptionValue}
				leftIcon={
					<Icon
						name="md-document"
						size={24}
						color='#29B3A6'
					/>
				}
				label="Description"
				// inputStyle={styles.inputStyleDefault}
				placeholder="Description"
				placeholderTextColor="#eee"
				onChangeText={() => props.onChangeText("description", val)}
			/>
			<View style={styles.placeholder}>
				<Image source={{ uri: props.imageUri }} style={styles.previewImage} />
			</View>
			<Button title="Choose an image" type="clear" onPress={() => this.pickImageHandler("inbound")}/>
			{addInboundItemButton}
		</View>
	// </Overlay>
);



const styles = StyleSheet.create({
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
		borderColor:"red"
	}
});
// const addItemOverlay = (props) => (
// 	<Overlay
// 		isVisible={props.allModalIsVisible}
// 		onBackdropPress={props.toggleAllModal}
// 		onRequestClose={props.toggleAllModal}
// 		animate="slide"
// 		height={60}
// 		overlayBackgroundColor="transparent"
// 		overlayStyle={{
// 			// backgroundColor:"gold",
// 			// display:"none",
// 			elevation:1,
// 			backgroundColor: "rgba(0,0,0,0.5)",
// 			borderTopWidth:0
// 		}}>
// 		<View>
// 			<View style={{flex:1, flexDirection: "row", justifyContent:"center"}}>
// 				<Button 
// 					title="Inbound"
// 					onPress={props.toggleInboundModal}
// 					onLongPress={props.toggleInboundModal}
// 					buttonStyle={{
// 						backgroundColor:props.buttonColor,
// 						padding:20,
// 						marginRight:20
// 					}}
// 					icon={
// 						<Icon 
// 							name="md-add"
// 							style={{color:"white"}}
// 							size={30}
// 						/>
// 					}
// 					titleStyle={{marginLeft:10}}
// 				/>
// 				<Button 
// 					title="Outbound"
// 					// color={this.state.themeColor}
// 					onPress={props.toggleOutboundModal}
// 					onLongPress={props.toggleOutboundModal}
// 					buttonStyle={{
// 						backgroundColor:props.buttonColor,										
// 						padding:20,
// 						marginLeft:20
// 					}}
// 					icon={
// 						<Icon 
// 							name="md-remove"
// 							style={{color:"white"}}
// 							size={30}
// 						/>
// 					}
// 					titleStyle={{marginLeft:10}}

// 				/>
// 			</View>
// 		</View>
// 	</Overlay>
// );

export default addItemOverlay;