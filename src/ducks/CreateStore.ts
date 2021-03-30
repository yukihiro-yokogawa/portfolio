import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import projectSlice, { initialState as projectState } from './Slice/ProjectSlice';
import aboutSlice, { initialState as aboutState } from './Slice/AboutSlice';
import techniqueSlice, { initialState as techniqueState } from './Slice/TechniqueSlice';
import techniqueTypeSlice, { initialState as techniqueTypeState } from './Slice/TechniqueTypeSlice';
import skillSlice, { initialState as skillState } from './Slice/SkillSlice';
import networkSlice, { initialState as networkState } from './Slice/NetworkSlice';
import profileSlice, { initialState as profileState } from './Slice/ProfileSlice';
import myProfileSlice, { initialState as myProfileState } from './Slice/MyProfileSlice';

const rootReducer = combineReducers({
	skills: skillSlice.reducer,
	projects: projectSlice.reducer,
	abouts: aboutSlice.reducer,
	techniques: techniqueSlice.reducer,
	techniqueTypes: techniqueTypeSlice.reducer,
	profiles: profileSlice.reducer,
	myProfiles: myProfileSlice.reducer,
	network: networkSlice.reducer,
});

const preloadedState = () => {
	return {
		skills: skillState,
		projects: projectState,
		abouts: aboutState,
		techniques: techniqueState,
		techniqueTypes: techniqueTypeState,
		profiles: profileState,
		myProfiles: myProfileState,
		network: networkState,
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
