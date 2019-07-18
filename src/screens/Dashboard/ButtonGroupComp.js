import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';


class ButtonGroupComp extends Component {

	constructor(props){
		super(props);

		this.state = {
			selectedIndex: 0,
		}

		this.updateIndex = this.updateIndex.bind(this);
	}

	updateIndex(selectedIndex) {
		console.log(selectedIndex);
		// uiStartLoading();
		this.setState(prevState => {
			return {
				...prevState,
				selectedIndex: selectedIndex
			};
		});
		// uiStopLoading();
	}

	render(){
		return (
				<ButtonGroup
					Component={TouchableOpacity}
					onPress={this.updateIndex}
					buttonStyle={{borderRightWidth:0,backgroundColor:'transparent',paddingBottom:20}}
					selectedIndex={this.state.selectedIndex}
					innerBorderStyle={{width:0}}
					buttons={["All", "Inbound", "Outbound"]}
					// buttons={["All", "Inbound", "Outbound"]}
					containerStyle={{height:30,borderWidth:0,backgroundColor:"transparent",top:0,borderWidth:1, borderColor:"gold",width:"100%", right:20}}
					// disabledStyle={{}}
					selectedButtonStyle={{backgroundColor:"transparent",borderBottomWidth:1, borderColor:"grey"}}
					textStyle={{color:"darkgrey", fontSize:13}}
					selectedTextStyle={{color:"black"}}
				/>
		);
	}
}


const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading,
		dashboardSelectedListIndex: state.dashboard.selectedListIndex
	}
}


// export default connect(mapStateToProps, null)(ButtonGroupComp);
export default ButtonGroupComp;