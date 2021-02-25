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
		postAboutRequest: (state, action: PayloadAction<AboutState>) => [...state.concat(action.payload)],
		getAboutFailure: (state) => ({
			...state,
		}),
	},
});

export default aboutSlice;

export const { getAboutRequest, postAboutRequest, getAboutFailure } = aboutSlice.actions;

// action実行関数
export const getAboutsAsync = () => async (dispatch: (arg0: { payload: Array<AboutState>; type: string }) => void): Promise<void> => {
	axios.get(`/api/about/get`).then((response) => {
		dispatch(getAboutRequest(response.data));
	});
};

export const postAboutAsync = (about: AboutState) => async (
	dispatch: (arg0: { payload: AboutState; type: string }) => void,
): Promise<void> => {
	const formData = new FormData();
	formData.append('about', new Blob([JSON.stringify(about)], { type: 'application/json' }));
	axios.post(`/api/about/post`, formData);
	dispatch(postAboutRequest(about));
};
