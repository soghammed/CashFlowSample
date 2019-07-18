import { ADD_OUTBOUND_ITEM, REMOVE_OUTBOUND_ITEM, SET_OUTBOUND_CURRENT_BALANCE } from '../actions/actionTypes';
import { Avatar } from 'react-native-elements';
import pic from '../../assets/img/tab2.jpg';
import pic1 from '../../assets/img/tab1.jpg';
import React from 'react';

const initialState = {
	outboundItems: [
		{
			name: "test1",
			subtitle: "£10.00",
			avatar: (<Avatar
						size="small"
						rounded
						source={pic1}
					/>)
		},
		{
			name: "test2",
			subtitle: "£20.00",
			avatar: (<Avatar
						size="small"
						rounded
						source={pic}
					/>)
		},
	],
	currentBalance: 0,
};

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case ADD_OUTBOUND_ITEM:
			return {
				...state,
				outboundItems: state.outboundItems.concat({
					key: state.outboundItems.length ? state.outboundItems.length+1 : null,
					title: action.title,
					amount: action.amount
				})
			};
			break;

		case REMOVE_OUTBOUND_ITEM:
			return {
				...state,
				outboundItems: state.outboundItems.filter(items => {
					return items.key !== action.itemKey;
				})
			};
			break;

		case SET_OUTBOUND_CURRENT_BALANCE:
			return {
				...state,
				currentBalance: action.currentBalance
				// currentBalance: (state) => (
				// 	let cb = state.currentBalance;
				// 	if(state.outboundItems.length > 0) {
				// 		state.outboundItems.map((key, val) => {
				// 			if(key === 'amount') cb += val;
				// 		});
				// 	}
				// 	return cb;
				// );
			};
			break;

		default:
			return state;
	}
}

export default reducer;