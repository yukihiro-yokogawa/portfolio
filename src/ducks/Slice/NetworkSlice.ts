import { createSlice } from '@reduxjs/toolkit';
import { NetworkState } from '~/Type/Network';

export const initialState: NetworkState = {
	success: null,
	failure: null,
};

const networkSlice = createSlice({
	name: 'network',
	initialState,
	reducers: {
		requestSuccess: (state) => {
			return { ...state, success: true, failure: false };
		},
		requestFairure: (state) => {
			return { ...state, success: false, failure: true };
		},
		requestStatusReset: (state) => {
			return { ...state, success: null, failure: null };
		},
	},
});

export const { requestSuccess, requestFairure, requestStatusReset } = networkSlice.actions;

export default networkSlice;

export const requestSwitcher = () => async (dispatch: (arg0: { payload: NetworkState }) => void): Promise<void> => {
	dispatch(requestStatusReset());
};
