import { AsyncStorage } from 'react-native';
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading, getTheme } from './index';
import { Navigation } from 'react-native-navigation';
// import { goToDashboard, goToAuth } from '../../screens/Navigation/navigation';
import startMainTabs from '../../Utility/Navigation/startMainTabs';
const API_KEY = "AIzaSyDS5WlAAd0vgJR-SMNEBl_75ynBpCNj-LI";

export const tryAuth = (authData, authMode) => {
	return dispatch => {
		dispatch(uiStartLoading());
		let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="+API_KEY;
		if(authMode === "signup"){
			url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+API_KEY;
		}
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				email: authData.email,
				password: authData.password,
				returnSecureToken: true
			}),
			headers: {
				"Content-Type":"application/json"
			}
		})
		.catch(err => {
			console.log('err:', err);
			dispatch(uiStopLoading());
		})
		.then(res => res.json())
		.then(response => {
			console.log('response:', response);
			dispatch(uiStopLoading());
			if(!response.idToken){
				alert("Failed... please try again!");
			}else{
				console.log(response.idToken,response.expiresIn,response.refreshToken);
				dispatch(
					authStoreToken(
						response.idToken,
						response.expiresIn,
						response.refreshToken
					)
				);
				console.log('dashboard screen appears here');
				// dispatch(getTheme());
				startMainTabs(dispatch(getTheme()));
			}
		})
	}
};

export const authStoreToken = (token, expiryIn, refreshToken) => {
	return dispatch => {
		const now = new Date();
		let expiryDate = now.getTime() + expiryIn * 1000;
		dispatch(authSetToken(token, expiryDate))  
		expiryDate = expiryDate.toString()
		AsyncStorage.setItem("cf:auth:token", token);
		AsyncStorage.setItem("cf:auth:expiryDate", expiryDate);
		AsyncStorage.setItem("cf:auth:refreshToken", refreshToken);
	}
};

export const authSetToken = (token, expiryDate) => {
	return {
		type: AUTH_SET_TOKEN,
		token: token,
		expiryDate: expiryDate
	};
};

export const authGetToken = () => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			const token = getState().auth.token;
			const expiryDate = getState().auth.expiryDate;
			if(!token || new Date(expiryDate) <= new Date()) {
				let fetchedToken;
				AsyncStorage.getItem("cf:auth:token")
					.catch(err => reject())
					.then(tokenFromStorage => {
						if(!tokenFromStorage){
							reject();
							return;
						}
						fetchedToken = tokenFromStorage;
						return AsyncStorage.getItem("cf:auth:expiryDate");
					})
					.then(expiryDate => {
						parsedExpiryDate = new Date(parseInt(expiryDate));
						const now = new Date();
						if(parsedExpiryDate > now) { 
							dispatch(authSetToken(fetchedToken))
							resolve(fetchedToken)
						}else{
							reject();
						}
					})
					.catch(err => reject());
			}else{
				console.log('found token in state, LINE:98 File:auth.js');
				resolve(token);
			}
		});
		return promise
			.catch(err => {
				console.log("err LINE:104, auth.js", err);
				return AsyncStorage.getItem("cf:auth:refreshToken")
					.then(refreshToken => {
						return fetch("https://securetoken.googleapis.com/v1/token?key="+API_KEY, 
							{
								method: "POST",	
								headers: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								body: "grant_type=refresh_token&refresh_token="+refreshToken
							}
						);
					})
					.then(res => res.json())
					.then(response => {
						if(response.id_token) {
							console.log('Token Refesh API POST response received: ', response);
							dispatch(
								authStoreToken(
									response.id_token,
									response.expires_in,
									response.refresh_token
								)
							);
							return response.id_token;
						}else{
							dispatch(authClearStorage());
						}
					});
			})
			.then(token => {
				if(!token) {
					throw(new Error());
				}else{
					return token;
				}
			});
	}
};

export const authAutoSignIn = () => {
	return dispatch => {
		dispatch(authGetToken())
			.then(token => {
				// console.log("AutoSignIn: dispatched authGetToken result is -", token);
				// console.log(getTheme);
				let themeObj = dispatch(getTheme());
				// console.log(theme);
				startMainTabs(themeObj);
			})
			.catch(err => console.log('error from authAutoSignIn', err));
	};
};

export const authClearStorage = () => {
	return dispatch => {
		AsyncStorage.removeItem('cf:auth:token');
		AsyncStorage.removeItem('cf:auth:expiryDate');
		return AsyncStorage.removeItem('cf:auth:refreshToken');
	};
};

export const authLogout = () => {
	return dispatch => {
		dispatch(authClearStorage())
			.then(() => {
				Navigation.startSingleScreenApp({
				  screen: {
				    screen: "auth",
				    navigatorStyle: {
				      drawUnderNavBar: true,
				      navBarHidden: true
				      // navBarTransparent: true,
				      // navBarTranslucent: true 
				    },
				    // navigationBarStyle:{ navBarHidden: true },
				  }
				});
			});
			dispatch(authRemoveToken());
	}
};

export const authRemoveToken = () => {
	return {
		type: AUTH_REMOVE_TOKEN,
	};
};