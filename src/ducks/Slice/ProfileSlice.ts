import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProfileState } from '~/Type/Profile';
import { requestFairure } from './NetworkSlice';

export const initialState: Array<ProfileState> = [{ id: 0, name: '', displayOrder: 0 }];

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		getProfileRequest: (_state, action: PayloadAction<Array<ProfileState>>) => [...action.payload],
	},
});

export default profileSlice;

export const { getProfileRequest } = profileSlice.actions;

export const getProfileAsync = () => async (dispatch: (arg0: { payload: Array<ProfileState>; type: string }) => void): Promise<void> => {
	axios
		.get(`/api/profile/get`, { params: { query: 'GetProfile' } })
		.then((response) => {
			dispatch(getProfileRequest(response.data));
		})
		.catch((err) => {
			console.log(err);
			dispatch(requestFairure());
		});
};
