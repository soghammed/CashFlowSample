import React, { Component } from 'react';
import { connect } from 'react-redux';


class theme extends Component { 

	constructor(props){
		super(props);
		this.getTheme = this.getTheme.bind(this);
	}

	getTheme(){
		return {
			themeColor: this.props.themeColor,
			themeMode: this.props.themeMode
		};
	}

}

const mapStateToProps = (state) => {
	return {
		themeColor: state.settings.themeColor,
		themeMode: state.settings.themeMode
	};
}

// connect(mapStateToProps, null)(theme);
export default connect(mapStateToProps, null)(theme);