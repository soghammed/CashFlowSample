import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const DefaultInput = (props) => (
	//<TextInput
	//	{...props}
	//	style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
	///>
	<Input
		{...props}
		style={[styles.input, props.style]}
	/>
);

const styles = StyleSheet.create({
	input: {
		width:"100%",
		borderColor: "gold",
		borderBottomWidth:2,
	},
	invalid:{
		backgroundColor: '#f9c0c0',
		borderColor: '#f9c0c0',
	}
})

export default DefaultInput;