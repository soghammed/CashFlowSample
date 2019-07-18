import { Text, View, Image} from 'react-native';
import React from 'react';
import me from '../../../assets/img/me.jpg';

const Flexbox = () => (
	<View style={{flexbox: 1,height:"100%", backgroundColor:"maroon", borderWidth:2}}>
		<View style={{flexbox:2, justifyContent:"center", alignItems:"center"}}>
			<Image style={{height:"90%", borderRadius:150}} source={me}/>
		</View>
		<View style={{flexbox:1, alignItems:"center"}}>
			<Text style={{fontSize:20,color:"gold"}}>Once Upon a Time</Text>
		</View>
		<View>
		</View>
	</View>
); 


//example1 
{/*
<View style={{
		flexbox:1, 
		alignItems:"center",
		justifyContent: "center",
		backgroundColor:"maroon",
		height:"100%",
		}}> 
		<View style={{
			flexbox:1,
			flexDirection: "column",
			// justifyContent: "center",
			alignItems:"center",
			borderColor:"black",
			borderWidth:1,
		}}>
			<View style={{
				backgroundColor:"#571845",
				width: 50,
				height:50
			}}/>
			<View style={{
				backgroundColor:"#900C3E",
				width: 50,
				height:50
			}} />
			<View style={{
				backgroundColor:"#C70039",
				width: 50,
				height:50
			}} />
			<View style={{
				backgroundColor:"#FF5733",
				width: 50,
				height:50
			}} />
			<View style={{
				backgroundColor:"#FFC300",
				width: 50,
				height:50
			}} />
		</View>
</View>
*/}
export default Flexbox;