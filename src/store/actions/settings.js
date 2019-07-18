import { SET_THEME_MODE, SET_THEME_COLOR } from './actionTypes';

export const setThemeMode = (mode) => {
	return {
		type: SET_THEME_MODE,
		payload: mode
	};
}

export const setThemeColor = (color) => {
	return {
		type: SET_THEME_COLOR,
		payload: color
	};
}

export const getTheme = () => {
	return (dispatch, getState) => {
		return getState().settings.theme[getState().settings.themeMode];
	}
}