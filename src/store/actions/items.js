import { SET_ITEMS, REMOVE_ITEM, SET_CURRENT_BALANCE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

//actual
export const getItems = () => {
	return dispatch => {
		dispatch(uiStartLoading());
		dispatch(authGetToken())
			.then(token => {
				return fetch("https://cashflow-69833.firebaseio.com/cashflow.json?auth="+token)
			})
			.catch( () => {
				alert("No Valid token found");
				dispatch(uiStopLoading());
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
				// console.log('items ready to be set');
				let currentBalance = 0;
				items.map(item => { 
					if(item.type == "inbound")
						currentBalance += parseFloat(item.amount);
					else if(item.type == "outbound")
						currentBalance -= parseFloat(item.amount);
				});
				//calculate all balance and set

				//calculate inbound balance and set
				let inboundTotal = 0;
				items.map(item => {
					item.type == "inbound" ? inboundTotal += parseFloat(item.amount) : inboundTotal;
				});
				//calculate outbound balance and set 
				
				let outboundTotal = 0;
				items.map(item => {
					item.type == "outbound" ? outboundTotal += parseFloat(item.amount) : outboundTotal;
				});
				dispatch(setCurrentBalance(currentBalance, inboundTotal, outboundTotal));
				dispatch(uiStopLoading());
				dispatch(setItems(items))
			})
			.catch(err => {
				alert("Something went wrong... line 31");
				console.log(err);
				dispatch(uiStopLoading());
			})
	}
}

export const setItems = items => {
	return {
		type: SET_ITEMS,
		payload: items
	}
}

export const addItem = (title, amount, description, image, type) => {
	return dispatch => {
		let authToken;
		dispatch(uiStartLoading());
		dispatch(authGetToken())
			.then(token => {
				authToken = token;
				console.log('from addItem action', title, amount, description, image, type);
				if(image.base64){
					return fetch("https://us-central1-cashflow-69833.cloudfunctions.net/storeImage", {
						method: "POST",
						body: JSON.stringify({
							image: image.base64
						}),
						headers:{
							"Authorization": "Bearer "+authToken,
						}
					})
				}else{
					return {
						image: null
					}
				}
			})
			.catch(err => console.log(err))
			.then(res => {
				//response object from image and Promise object after res.json() when image upload persistant.
				if(res.status){
					res.json();
				}else{
					res;
				}
			})
			.then(response => {
				console.log('response from image storing');
				// console.log(response);
				const flowData = {
					name: title,
					amount: amount,
					description: description,
					image: response ? response.imageUrl : null,
					imagePath: response ? imagePath : null,
					date: Date.now(),
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
					dispatch(getItems());
					dispatch(uiStopLoading());
					//inform store of cashFlowAdded for balance to update for example.
				})
			})
			.catch(err => {
				dispatch(uiStopLoading());
				console.log(err);
			});
	}
}

export const deleteItem = (key) => {
	return (dispatch, getState) => {
		dispatch(authGetToken())
			.then(token => {
				dispatch(uiStartLoading());
				dispatch(removeItem(key));
				return fetch("https://cashflow-69833.firebaseio.com/cashflow/"+key+".json?auth="+token, {
					method: "DELETE"
				})
			})
			.catch( () => {
				alert("No Valid token found!");
			})
			.then(res => res.json())
			.then(response => {
				console.log('success response after delete from server and local');
				let items = getState().items.items;
				console.log('items from state', items);
				let currentBalance = 0;
				items.map(item => { 
					if(item.type == "inbound")
						currentBalance += parseFloat(item.amount);
					else if(item.type == "outbound")
						currentBalance -= parseFloat(item.amount);
				});
				
				//calculate inbound balance and set
				let inboundTotal = 0;
				items.map(item => {
					item.type == "inbound" ? inboundTotal += parseFloat(item.amount) : inboundTotal;
				});
				//calculate outbound balance and set 
				
				let outboundTotal = 0;
				items.map(item => {
					item.type == "outbound" ? outboundTotal += parseFloat(item.amount) : outboundTotal;
				});
				dispatch(setCurrentBalance(currentBalance, inboundTotal, outboundTotal));
				dispatch(uiStopLoading());
			})
			.catch(err => {
				alert("Something went wrong, sorry :/");
				console.log(err);
				dispatch(uiStopLoading());
			})
	}
}

export const removeItem = (key) => {
	return {
		type: REMOVE_ITEM,
		key: key
	};
}

export const setCurrentBalance = (currentBalance, inboundBalance, outboundBalance) => {
	return {
		type: SET_CURRENT_BALANCE,
		currentBalance: currentBalance,
		inboundBalance: inboundBalance,
		outboundBalance: outboundBalance
	};
}

const calculateCurrentBalance = items => {
	console.log('itemss heree', items);
	// console.log('items ready to be set');
	let currentBalance = 0;
	items.map(item => { 
		if(item.type == "inbound")
			currentBalance += parseFloat(item.amount);
		else if(item.type == "outbound")
			currentBalance -= parseFloat(item.amount);
	});
	//calculate all balance and set

	//calculate inbound balance and set
	let inboundTotal = 0;
	items.map(item => {
		item.type == "inbound" ? inboundTotal += parseFloat(item.amount) : inboundTotal;
	});
	//calculate outbound balance and set 
	
	let outboundTotal = 0;
	items.map(item => {
		item.type == "outbound" ? outboundTotal += parseFloat(item.amount) : outboundTotal;
	});

	return {
		currentBalance: currentBalance,
		inboundTotal: inboundTotal,
		outboundTotal: outboundTotal
	}
}
//end actual

//start old

// export const addInboundItem = (title, amount, description, image, type) => {
	
// 	// return {
// 	// 	type: ADD_INBOUND_ITEM,
// 	// 	title: title,
// 	// 	amount: amount
// 	// 	image: 
// 	// };
// }

// export const deleteInboundItem = (key) => {
// 	return dispatch => {
// 		dispatch(authGetToken())
// 			.then(token => {
// 				dispatch(uiStartLoading());
// 				dispatch(removeInboundItem(key));
// 				return fetch("https://cashflow-69833.firebaseio.com/cashflow/"+key+".json?auth="+authToken, {
// 					method: "DELETE"
// 				})
// 			})
// 			.catch( () => {
// 				alert("No Valid token found!");
// 			})
// 			.then(res => res.json())
// 			.then(response => {
// 				console.log('success response after delete from server and local');
// 				dispatch(uiStopLoading());
// 			})
// 			.catch(err => {
// 				alert("Something went wrong, sorry :/");
// 				console.log(err);
// 				dispatch(uiStopLoading());
// 			})
// 	}
// }

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

//end old