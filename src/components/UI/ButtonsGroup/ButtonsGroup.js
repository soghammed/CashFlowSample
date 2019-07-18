import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Text, Icon, Badge } from 'react-native-elements';
import { connect } from 'react-redux';

class ButtonsGroup extends Component {

	constructor(props){
		super(props);

		// let balance = 0;
		// let currentBalance = 
		// 	this.props.data.map(item => {
		// 		return balance += parseFloat(item.amount);
		// 	})
		// 	// console.log(currentBalance);
		// this.state = {
		// 	currentBalance: currentBalance, 
		// 	inboundBalance: 0,
		// 	outboundBalance: 0
		// };
	}

	addToCurrentBalance(currentBalance, newAmount){
		return currentBalance += newAmount;
	}

	getCurrentBalance(){
		let balance = 0;
		this.props.data.map(item => {
			balance += item.amount;
		});
		this.setState({
			currentBalance: balance
		});
	}

	componentDidMount(){
		// this.getCurrentBalance();
		console.log(this.props.items);
	}

	render(){
		console.log(this.props.currentBalance);
		let currentBalanceBadge = 
			this.props.selectedIndex == 0 ?
			(
				<Badge 
					value={"£"+this.props.currentBalance}
					badgeStyle={{
						backgroundColor: this.props.currentBalance > 0 ? "green":"darkred"
					}}
					containerStyle={{
						position: 'absolute',
						left:90,//on landscape needs fixing..
						top:5,
					}}
				/>
			)
			:
			null;

		let inboundBalanceBadge = 
			this.props.selectedIndex == 1 ?
			(
				<Badge 
					value={"£"+this.props.inboundBalance}
					// status="success"
					badgeStyle={{
						backgroundColor:"green"
					}}
					containerStyle={{
						position: 'absolute',
						left:235,//on landscape needs fixing..
						top:5
					}}
				/>
			)
			:
			null;

		let outboundBalanceBadge = 
			this.props.selectedIndex == 2 ?
			(
				<Badge 
					value={"£"+this.props.outboundBalance}
					// status="success"
					badgeStyle={{
						backgroundColor:"darkred"
					}}
					containerStyle={{
						position: 'absolute',
						right:35,//on landscape needs fixing..
						top:5
					}}
				/>
			)
			:
			null
		return(
			<View style={{
				// flex: 1,
				flexDirection: "row",
				width:"100%",
				// height:0,
				justifyContent:'flex-start',
				// marginTop:,
				paddingTop:10,
				backgroundColor:"#00294F"
			}}>
				<Avatar
					activeOpacity={1}
					// rounded
					size="small"
					icon={{
						size:30,
						name:'home',
						// color: 'white'
					}}
					overlayContainerStyle={{
						borderBottomWidth: this.props.selectedIndex == 0 ? 3 : 0,
						borderColor:"white",
						backgroundColor: "transparent",
						// backgroundColor: "#2d2d2d",
						opacity: this.props.selectedIndex == 0 ? 1 : 0.5
					}}
					containerStyle={[{
						// borderColor:"red"	 //this.state.type === "inbound" ? "lightgreen" : "grey",
					}, styles.commonButtonStyle]}
					onPress={() => this.props.onPress(0)}
					onLongPress={() => this.props.onPress(0)}
				/>
				{currentBalanceBadge}
				<Avatar
					activeOpacity={1}
					// rounded
					size="small"
					icon={{
						size:30,
						name:'trending-up',
						// color: 'green'
					}}
					overlayContainerStyle={{
						borderBottomWidth: this.props.selectedIndex == 1 ? 3 : 0,
						borderColor:"green",
						backgroundColor: "transparent",
						// backgroundColor: "#2d2d2d",
						opacity: this.props.selectedIndex == 1 ? 1 : 0.5
					}}
					containerStyle={[styles.commonButtonStyle]}
					onPress={() => this.props.onPress(1)}
					onLongPress={() => this.props.onPress(1)}
				/>
				{inboundBalanceBadge}
				<Avatar
					activeOpacity={1}
					// rounded
					size="small"
					icon={{
						size:30,
						name:'trending-down',
					}}
					overlayContainerStyle={{
						borderBottomWidth: this.props.selectedIndex == 2 ? 3 : 0,
						borderColor:"darkred",
						backgroundColor: "transparent",
						// backgroundColor: "#2d2d2d",
						opacity: this.props.selectedIndex == 2 ? 1 : 0.5
					}}
					containerStyle={[styles.commonButtonStyle]}
					onPress={() => this.props.onPress(2)}
					onLongPress={() => this.props.onPress(2)}
				/>
				{outboundBalanceBadge}
			{/*
				<Button 
					buttonStyle={[{
						borderColor:"gold",
						borderWidth:1
					}, styles.testButtonStyle]}
					containerStyle={[{
						borderColor:"red",
						borderWidth:1
					}, styles.commonButtonContainerStyle]}
				/>
				<Button 
					buttonStyle={[{
						borderColor:"gold",
						borderWidth:1,
						backgroundColor:"transparent",
						padding:0
					}, styles.testButtonStyle]}
					containerStyle={[{
						borderBottomWidth: this.props.selectedIndex == 0 ? 1 : 0,
						borderColor:"darkred",
						backgroundColor: "transparent",
					}, styles.commonButtonContainerStyle]}
					icon={{
						name: "trending-up",
						size: 20,
						color: 'white'
					}}
					iconContainerStyle={{
						borderColor:"blue",
						borderWidth:1,
						backgroundColor: 'darkred',
						borderRadius: 50,
						padding:8
					}}
					// title="Inbound"
					// titleStyle={{
					// 	color:"#2d2d2d",
					// 	marginLeft:10
					// }}
				/>
				<Button 
					buttonStyle={[{
						borderColor:"gold",
						borderWidth:1
					}, styles.testButtonStyle]}
					containerStyle={[{
						borderColor:"red",
						borderWidth:1
					}, styles.commonButtonContainerStyle]}
				/>
			*/}
			</View>
		);
	}
}



const styles = StyleSheet.create({
	commonButtonStyle: {
		// height: 45,
		width:"33.35%",
		// marginLeft:"18.5%",
		// marginRight:1
		// paddingLeft:20
		// borderRadius:0,
		// backgroundColor:"transparent",
	},

	testButtonStyle:{
		width:"100%"
	},
	commonButtonContainerStyle:{
		width:"33.35%"
	}
});


const mapStateToProps = state => {
	return {
		items: state.items.items,
		currentBalance: state.items.currentBalance,
		inboundBalance: state.items.inboundBalance,
		outboundBalance: state.items.outboundBalance
	}
}

export default connect(mapStateToProps, null)(ButtonsGroup);