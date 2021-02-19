import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AboutState } from '~/Type/About';

// デフォルトのstate
export const initialState: Array<AboutState> = [{ id: 0, name: '' }];

const aboutSlice = createSlice({
	name: 'abouts',
	initialState,
	reducers: {
		//action
		getAboutRequest: (_state, action: PayloadAction<Array<AboutState>>) => [...action.payload],
		getAboutFailure: (state) => ({
			...state,
		}),
	},
});

export default aboutSlice;

export const { getAboutRequest, getAboutFailure } = aboutSlice.actions;

// action実行関数
export const getAboutsAsync = () => async (dispatch: (arg0: { payload: Array<AboutState>; type: string }) => void): Promise<void> => {
	axios.get(`/api/about/get`).then((response) => {
		dispatch(getAboutRequest(response.data));
	});
};
