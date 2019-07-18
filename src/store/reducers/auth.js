import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from '../actions/actionTypes';

const initialState = {
	token: null,
	expiryDate: null,
};

const reducer = (state = initialState, action) => {
	switch( action.type ) {
		case AUTH_SET_TOKEN:
			return {
				...state,
				token: action.token,
				expiryDate: action.expiryDate
			};
			break;

		case AUTH_REMOVE_TOKEN:
			return {
				...state,
				token: null,
				expiryDate: null
			};
			break;

		default:
			return state;
	}	
}


export default reducer;