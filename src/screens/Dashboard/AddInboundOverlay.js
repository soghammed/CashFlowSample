import React, {Component} from 'react';
import { View } from 'react-native';
import {Overlay, Button} from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/Ionicons';


const addInboundOverlay = (props) => (
	<Overlay
		isVisible={props.allModalIsVisible}
		onBackdropPress={props.toggleAllModal}
		onRequestClose={props.toggleAllModal}
		animate="slide"
		height={60}
		overlayBackgroundColor="transparent"
		overlayStyle={{
			// backgroundColor:"gold",
			// display:"none",
			elevation:1,
			backgroundColor: "rgba(0,0,0,0.5)",
			borderTopWidth:0
		}}>
		<View>
			<View style={{flex:1, flexDirection: "row", justifyContent:"center"}}>
				<Button 
					title="Inbound"
					onPress={props.toggleInboundModal}
					onLongPress={props.toggleInboundModal}
					buttonStyle={{
						backgroundColor:props.buttonColor,
						padding:20,
						marginRight:20
					}}
					icon={
						<Icon 
							name="md-add"
							style={{color:"white"}}
							size={30}
						/>
					}
					titleStyle={{marginLeft:10}}
				/>
				<Button 
					title="Outbound"
					// color={this.state.themeColor}
					onPress={props.toggleOutboundModal}
					onLongPress={props.toggleOutboundModal}
					buttonStyle={{
						backgroundColor:props.buttonColor,										
						padding:20,
						marginLeft:20
					}}
					icon={
						<Icon 
							name="md-remove"
							style={{color:"white"}}
							size={30}
						/>
					}
					titleStyle={{marginLeft:10}}

				/>
			</View>
		</View>
	</Overlay>
);

export default addInboundOverlay;