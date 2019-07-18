import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/index';
import sideImg from '../../assets/img/sidedrawerImg.jpg';
class SideDrawer extends Component {

	constructor(props){
		super(props);
		this.state = {};
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}


	onNavigatorEvent = event => {
		if(event.type === "ScreenChangedEvent"){
			if(event.id === "willAppear"){
				// this.props.onGetItems();
			}
		}
	}

	render(){
		return (
			<View style={[styles.container, {width: Dimensions.get('window').width * 0.7, backgroundColor:"#00294F"}]}>
				<Image source={sideImg} style={styles.imgContainer} />
				<View style={styles.navigationSidebarList}>
					<TouchableOpacity>
						<Button
							icon={
								<Icon
									name="md-log-out"
									size={30}
									color="white"
								/>
							}
							iconLeft={true}
							titleStyle={{marginLeft:10, color:"#eee"}}
							title="Log out"
							type="clear"
							onPress={this.props.onLogout}
							buttonStyle={{

							}}
						/>
					</TouchableOpacity> 
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// paddingTop: 32,
		backgroundColor: "#eee",
		flex: 1,
		margin:0,
		// borderWidth:1,
		// borderColor:'pink',
	},
	imgContainer:{
		height:120
	},
	navigationSidebarList:{
		marginTop:5,
	}
});

const mapDispatchToProps = dispatch => {
	return { 
		onLogout: () => dispatch(authLogout())
	}
}

export default connect(null, mapDispatchToProps)(SideDrawer);