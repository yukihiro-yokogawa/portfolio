import { createSlice } from '@reduxjs/toolkit';
import { NetworkState } from '~/Type/Network';

export const initialState: NetworkState = {
	success: null,
	failure: null,
	loading: null,
};

const networkSlice = createSlice({
	name: 'network',
	initialState,
	reducers: {
		requestSuccess: (state) => {
			return { ...state, success: true, failure: false, loading: false };
		},
		requestLoading: (state) => {
			return { ...state, success: null, failure: null, loading: true };
		},
		requestFairure: (state) => {
			return { ...state, success: false, failure: true, loading: false };
		},
		requestStatusReset: (state) => {
			return { ...state, success: null, failure: null, loading: false };
		},
	},
});

export const { requestSuccess, requestLoading, requestFairure, requestStatusReset } = networkSlice.actions;

export default networkSlice;

export const requestSwitcher = () => async (dispatch: (arg0: { payload: NetworkState }) => void): Promise<void> => {
	dispatch(requestStatusReset());
};
