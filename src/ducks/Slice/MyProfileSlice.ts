import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MyProfileState } from '~/Type/Profile';
import { requestFairure } from './NetworkSlice';

export const initialState: Array<MyProfileState> = [
	{ id: 0, title: '', description: '', date: '', deleted: false, profile: { id: 0, name: '', displayOrder: 0 } },
];

const MyProfileSlice = createSlice({
	name: 'myProfile',
	initialState,
	reducers: {
		getMyProfileRequest: (_state, action: PayloadAction<Array<MyProfileState>>) => [...action.payload],
	},
});

export default MyProfileSlice;

export const { getMyProfileRequest } = MyProfileSlice.actions;

export const getMyProfileAsync = () => async (
	dispatch: (arg0: { payload: Array<MyProfileState>; type: string }) => void,
): Promise<void> => {
	axios
		.get(`/api/MyProfile/get`, { params: { query: 'GetMyProfile' } })
		.then((response) => {
			dispatch(getMyProfileRequest(response.data));
		})
		.catch((err) => {
			console.log(err);
			dispatch(requestFairure());
		});
};
