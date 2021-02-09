import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import projectSlice, { initialState as projectState } from './Slice/ProjectSlice';
import aboutSlice, { initialState as aboutState } from './Slice/AboutSlice';

const rootReducer = combineReducers({
	projects: projectSlice.reducer,
	abouts: aboutSlice.reducer,
});

const preloadedState = () => {
	return {
		projects: projectState,
		abouts: aboutState,
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
