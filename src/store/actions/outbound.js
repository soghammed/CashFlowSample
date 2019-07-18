import { ADD_OUTBOUND_ITEM, REMOVE_OUTBOUND_ITEM, SET_OUTBOUND_CURRENT_BALANCE } from './actionTypes';


export const addOutboundItem = (title, amount) => {
	return {
		type: ADD_OUTBOUND_ITEM,
		title: title,
		amount: amount
	};
	// return (dispatch, getState) => {
	// };
}

export const removeOutboundItem = (key) => {
	return {
		type: REMOVE_OUTBOUND_ITEM,
		itemKey: key
	};
}

export const setOutboundCurrentBalance = (currentBalance) => {
	return {
		type: SET_OUTBOUND_CURRENT_BALANCE,
		currentBalance: currentBalance
	};
}