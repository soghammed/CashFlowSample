import { ADD_INBOUND_ITEM, REMOVE_INBOUND_ITEM, SET_INBOUND_CURRENT_BALANCE } from '../actions/actionTypes';
import { Avatar } from 'react-native-elements';
import pic from '../../assets/img/tab2.jpg';
import pic1 from '../../assets/img/tab1.jpg';
import React from 'react';
const initialState = {
	inboundItems: [
		{
			name: "test1",
			subtitle: "£10.00",
			avatar: (<Avatar
						size="small"
						rounded
						source={pic}
					/>)
		},
		{
			name: "test2",
			subtitle: "£20.00",
			avatar: (<Avatar
						size="small"
						rounded
						source={pic1}
					/>)
		}
	],
	currentBalance: 0
};

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case ADD_INBOUND_ITEM:
			return {
				...state,
				inboundItems: state.inboundItems.concat({
					key: state.inboundItems.length ? state.inboundItems.length+1 : null,
					title: action.title,
					amount: action.amount
					//add tag after all else
				})
			};
			break;

		case REMOVE_INBOUND_ITEM:
			return {
				...state,
				inboundItems: state.inboundItems.filter(items => {
					return items.key !== action.itemKey;
				})
			};
			break;

		case SET_INBOUND_CURRENT_BALANCE:
			return {
				...state,
				currentBalance: action.currentBalance
			};
			break;

		default:
			return state;
	}
};

export default reducer;

