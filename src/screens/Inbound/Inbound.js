import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class Inbound extends Component { 

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
		return(
			<FlatList
			  // keyExtractor={this.keyExtractor}
			  // data={this.props.inboundItems.concat(this.props.outboundItems)}
			  // style={styles.listContainer}
			  data={this.props.data}
			  renderItem={({item}) => {
			  	return (
			  		<ListItem
			  			title={item.name}
			  			subtitle={item.amount}
			  			leftAvatar={{ source: item.image }}
			  			badge={{badgeStyle: {backgroundColor:'lightgreen'}}}
			  			// containerStyle={{borderWidth:1, borderColor:"gold"}}
			  			/>

			  	);
			  }}
			/>
			
		);
	}
} 

 // <FlatList
		      // keyExtractor={this.keyExtractor}
		      // data={this.props.data}
		      // renderItem={this.renderItem}
		    // />

// const mapDispatchToProps = dispatch => {
// 	return {

// 	};
// }

// const mapStateToProps = state => {
// 	return {
// 		isLoading: state.ui.isLoading,
// 		inboundItems: state.inbound.inboundItems,
// 		currentBalance: state.inbound.currentBalance
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Inbound);
export default Inbound;