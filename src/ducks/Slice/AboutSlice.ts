import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AboutStates } from '~/Type/About';

// デフォルトのstate
export const initialState: AboutStates = {
	abouts: [],
};

const aboutSlice = createSlice({
	name: 'abouts',
	initialState,
	reducers: {
		//action
		getAboutRequest: (state, action: PayloadAction<AboutStates>) => ({
			...state,
			abouts: action.payload.abouts,
		}),
		getAboutFailure: (state) => ({
			...state,
		}),
	},
});

export default aboutSlice;

export const { getAboutRequest, getAboutFailure } = aboutSlice.actions;

// action実行関数
export const getAboutsAsync = () => async (dispatch: (arg0: { payload: AboutStates; type: string }) => void): Promise<void> => {
	axios.get(`/api/about/get`).then((response) => {
		const abouts: AboutStates = {
			abouts: response.data,
		};
		dispatch(getAboutRequest(abouts));
	});
};
