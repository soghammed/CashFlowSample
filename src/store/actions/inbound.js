import { ADD_INBOUND_ITEM, REMOVE_INBOUND_ITEM, SET_INBOUND_CURRENT_BALANCE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const getInboundItems = () => {
	return dispatch => {
		dispatch(authGetToken())
			.then(token => {
				return fetch("https://cashflow-69833.firebaseio.com/cashflow.json?auth="+token)
			})
			.catch( () => {
				alert("No Valid token found");
			})
			.then( res => res.json() )
			.then( response => {
				console.log("items received...", response);
				const items = [];
				for(let key in response) {
					items.push({
						...response[key],
						image:{
							uri: response[key].image
						},
						key: key
					})
				}
				console.log('items ready to be set');
				dispatch(setItems);
			} )
	}
}

export const addInboundItem = (title, amount, description, image, type) => {
	return dispatch => {
		let authToken;
		dispatch(uiStartLoading());
		dispatch(authGetToken())
			.then(token => {
				console.log('token recevied in addbountitem, continue');
				console.log(title, amount, image);
				//assuming all is fine go ahead
				return fetch("https://us-central1-cashflow-69833.cloudfunctions.net/storeImage", {
					method: "POST",
					body: JSON.stringify({
						image: image.base64
					}),
					headers:{
						"Authorization": "Bearer "+authToken,
					}
				})
			})
			.catch(() => {
				alert("No Valid token found!");
			})
			.then(res => res.json())
			.then(response => {
				console.log('response from image storing');
				const flowData = {
					name: title,
					amount: amount,
					description: description,
					image: response.imageUrl,
					imagePath: response.imagePath,
					date: Date.now()
					type: type
				};
				return fetch("https://cashflow-69833.firebaseio.com/cashflow.json?auth="+authToken, {
					method: "POST",
					body: JSON.stringify(flowData)
				})
				.catch(err => {
					console.log(err);
					alert("Something went wrong.. line 42");
					dispatch(uiStopLoading());
				})
				.then(res => res.json())
				.then(parsedRes => {
					console.log('response from cashFlowDataPost: ', parsedRes);
					dispatch(uiStopLoading());
					//inform store of cashFlowAdded for balance to update for example.
				})
			})

	}
	// return {
	// 	type: ADD_INBOUND_ITEM,
	// 	title: title,
	// 	amount: amount
	// 	image: 
	// };
}

export const deleteInboundItem = (key) => {
	return dispatch => {
		dispatch(authGetToken())
			.then(token => {
				dispatch(uiStartLoading());
				dispatch(removeInboundItem(key));
				return fetch("https://cashflow-69833.firebaseio.com/cashflow/"+key+".json?auth="+authToken, {
					method: "DELETE"
				})
			})
			.catch( () => {
				alert("No Valid token found!");
			})
			.then(res => res.json())
			.then(response => {
				console.log('success response after delete from server and local');
				dispatch(uiStopLoading());
			})
			.catch(err => {
				alert("Something went wrong, sorry :/");
				console.log(err);
				dispatch(uiStopLoading());
			})
	}
}

export const removeInboundItem = (key) => {
	return {
		type: REMOVE_INBOUND_ITEM,
		itemKey: key
	};
}

export const setInboundCurrentBalance = (currentBalance) => {
	return {
		type: SET_INBOUND_CURRENT_BALANCE,
		currentBalance: currentBalance
	};
}