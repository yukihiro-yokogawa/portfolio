import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Profile from '~/component/Profile/Profile';
import { getMyProfileAsync } from '~/ducks/Slice/MyProfileSlice';
import { getProfilesAsync } from '~/ducks/Slice/ProfileSlice';

const profile = (): JSX.Element => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfilesAsync());
		dispatch(getMyProfileAsync());
	}, [dispatch]);

	return <Profile />;
};

export default profile;
