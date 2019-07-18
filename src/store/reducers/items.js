import { SET_ITEMS, REMOVE_ITEM, SET_CURRENT_BALANCE } from '../actions/actionTypes';

const initialState = {
	inboundItems: [],
	outboundItems: [],
	items:[],
	itemAdded: null,
	currentBalance: 0,
	inboundBalance: 0,
	outboundBalance: 0
};

const reducer = (state = initialState, action) => {
	switch(action.type) {

		case "SET_ITEMS":
			return {
				...state,
				items: action.payload
			};
			break;
			// if(action.type === "inbound"){ 
			// 	return {
			// 		...state,
			// 		inboundItems: action.payload
			// 	}
			// }else if(action.type === "outbount"){
			// 	return {
			// 		...state,
			// 		outboundItems: action.payload
			// 	}
			// }
		case "REMOVE_ITEM":
			console.log('remove item action running with: ', action);
			return {
				...state,
				items: state.items.filter(item => {
					return item.key != action.key;
				})
			};
			// return {
			// 	...state,
			// 	[action.itemKey]: state[action.itemKey].filter(item => {
			// 		return item.key !== action.itemKey
			// 	})
			// };
			break;

		case "SET_CURRENT_BALANCE":
			return {
				...state,
				currentBalance: action.currentBalance,
				inboundBalance: action.inboundBalance,
				outboundBalance: action.outboundBalance
			};
			// switch(action.storeKey){
			// 	case "currentBalance":
			// 		return {
			// 			...state,

			// 		}
			// 		break;
			// 	case "outboundBalance":
			// 	case "inboundBalance":
			// }
		default:
			return state;
	}
}


export default reducer;