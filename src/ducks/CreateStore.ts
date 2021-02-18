import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import projectSlice, { initialState as projectState } from './Slice/ProjectSlice';
import aboutSlice, { initialState as aboutState } from './Slice/AboutSlice';
import techniqueSlice, { initialState as techniqueState } from './Slice/TechniqueSlice';
import techniqueTypeSlice, { initialState as techniqueTypeState } from './Slice/TechniqueTypeSlice';
import skillSlice, { initialState as skillState } from './Slice/SkillSlice';

const rootReducer = combineReducers({
	skills: skillSlice.reducer,
	projects: projectSlice.reducer,
	abouts: aboutSlice.reducer,
	techniques: techniqueSlice.reducer,
	techniqueTypes: techniqueTypeSlice.reducer,
});

const preloadedState = () => {
	return {
		skills: skillState,
		projects: projectState,
		abouts: aboutState,
		techniques: techniqueState,
		techniqueTypes: techniqueTypeState,
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
