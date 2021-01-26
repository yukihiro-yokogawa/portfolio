import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import projectSlice, { initialState as projectState } from './Slice/ProjectSlice';

const rootReducer = combineReducers({
	portfolio: projectSlice.reducer,
});

const preloadedState = () => {
	return {
		portfolio: projectState,
	};
};

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStore = Store<StoreState>;

const createStore = (): EnhancedStore => {
	const middlewareList = [...getDefaultMiddleware(), logger];
	return configureStore({
		reducer: rootReducer,
		middleware: middlewareList,
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState: preloadedState(),
	});
};

export default createStore;
