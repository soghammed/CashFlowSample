import { SET_THEME_MODE, SET_THEME_COLOR } from '../actions/actionTypes';

const initialState = {
	themeColor: "#29B3A6",
	themeMode: "dark",
	theme: {
		dark: {
			navBarTextColor: "#eee",
			titleColor: "#eee",
			flatListBackgroundColor: "#00294F",
			navBarBackgroundColor: "#00294F",
			navBarButtonColor: "#ffffff",
			tabBarBackgroundColor: "#2d2d2d",
			tabBarButtonColor: "grey",
			tabBarSelectedButtonColor: "#cc0000",
			screenBackgroundColor: "#333333",
		},
		light: {
			navBarTextColor: "#262626",			
			titleColor: "#262626",
			navBarBackgroundColor: "#ffffff",
			navBarButtonColor: "#2d2d2d",
			tabBarBackgroundColor: "#white",
			tabBarButtonColor: "#eee",
			tabBarSelectedButtonColor: "#29B3A6",
			screenBackgroundColor: "#ffffff",
		}
	}
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case SET_THEME_COLOR: 
			return {
				type: SET_THEME_COLOR,
				themeColor: action.payload
			}
			break;

		case SET_THEME_MODE:
			return {
				...initialState,
				themeMode: action.payload
			}
			break;

		default:
			return state;
	}
}

export default reducer;