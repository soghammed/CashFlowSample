import { connect, createStore, combineReducers, compose, applyMiddleware } from 'redux';
import inboundReducer from './reducers/inbound';
import outboundReducer from './reducers/outbound';
import uiReducer from './reducers/ui'; 
import itemsReducer from './reducers/items'; 
import thunk from 'redux-thunk';
import settingsReducer from './reducers/settings';

const rootReducer = combineReducers({
	// inbound: inboundReducer,
	// outbound: outboundReducer,
	items: itemsReducer,
	ui: uiReducer,
	settings: settingsReducer
});
	
if(__DEV__){
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
	return createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ));
}

export default configStore;