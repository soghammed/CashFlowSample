import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
class ItemList extends Component { 

	constructor(props){
		super(props);
	}



	// keyExtractor = (item, index) => index.toString()

	// renderItem = ({ item }) => (
	//   <ListItem
	//     title={item.name}
	//     subtitle={item.subtitle}
	//     leftAvatar={item.avatar}
	//     onPress={() => {
	//     	console.log();
	//     }}
	//   />
	// )

	render(){
		this.props.data = this.props.data.reverse();
		return(	
			<SwipeListView
				useFlatList
				data={this.props.data}
				renderItem={({item}) => {
					let date = new Date(item.date);
					// console.log(moment(date).format("YYYY-MM-DD"));
					// console.log(moment(date).fromNow());
					// let time = date.getTime();
					// date = date.getDate();
					// console.log(date,time);
					return (
						<ListItem
							title={item.name}
							titleStyle={{
								color:"#eee",
							}}
							subtitle={"£ "+item.amount+' - '+moment(date).fromNow()}
							subtitleStyle={{
								color:"#eee"
							}}
							leftAvatar={
								item.image.uri != null ?
									{ 
										size:"large",
										source: item.image, 
										containerStyle:{
											elevation:10
										},
									}
								:
									{
										icon:{
											size:30,
											name:'shopping-cart',
											color: "#eee"//item.type == "inbound" ? "green" : "darkred"
										},
										size:"large",
										overlayContainerStyle:{
											backgroundColor: "#00294F",
										}
									}
							}
							rightAvatar={{
								icon: {
									size:20,
									name: item.type == "inbound" ? "trending-up" : "trending-down"
								},
								size:"small",
								overlayContainerStyle:{
									backgroundColor: item.type == "inbound" ? "green" : "darkred",
								},
								containerStyle:{
									elevation:10
								}
							}}
							containerStyle={{
								backgroundColor:"transparent",
								// borderBottomWidth:1,
								// borderColor:"#3d3d3d",
							}}
							// badge={{
							// 	badgeStyle: item.type === "inbound" ? 
							// 	{backgroundColor:'lightgreen'} 
							// 	: 
							// 	item.type === "outbound" ?
							// 	{backgroundColor:'red'}
							// 	:
							// 	null
							// }}
							// containerStyle={{borderWidth:1, borderColor:"gold"}}
							/>

					);
				}}
				renderHiddenItem={ (data, rowMap) => {
					// console.log('hiddendata: ', data);
					// console.log('rowmap: ', rowMap);
					let deleteButton = this.props.isLoading ? 
					<ActivityIndicator />
					:
					(
						<Button
							// title="Delete"
							type="clear"
							icon={{
								name:"close",
								color:"red"
							}}
							onPress={() => this.props.onDeleteItem(data.item.key)}
							onLongPress={() => this.props.onDeleteItem(data.item.key)}
						/>
					);
					return (
						<View style={{flex:1, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
							{deleteButton}
						</View>
					);
				}}
	            leftOpenValue={50}
	            rightOpenValue={0}
			/>
		);
	}
} 

export default ItemList;