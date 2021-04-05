import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Create from '~/component/Profile/Create';
import { useStoreState } from '~/ducks/selector';
import { getMyProfileAsync, postMyProfileAsync } from '~/ducks/Slice/MyProfileSlice';
import { getProfilesAsync } from '~/ducks/Slice/ProfileSlice';
import { MyProfileDataState } from '~/Type/Profile';
import _ from 'lodash';

const create = (): JSX.Element => {
	const dispatch = useDispatch();

	const [profileFieldList, setProfileFieldList] = useState(useStoreState().myProfiles.map((_, i) => i));

	useEffect(() => {
		dispatch(getProfilesAsync());
		dispatch(getMyProfileAsync());
	}, [dispatch]);
	/**
	 * 技術新規追加フォーム増加イベント.
	 */
	const handleClickAddProfile = useCallback(() => {
		const newProfileField = profileFieldList.length == 0 ? 0 : _.max(profileFieldList) + 1;
		setProfileFieldList([...profileFieldList, newProfileField]);
	}, [profileFieldList]);

	/**
	 * 技術新規追加フォーム減少イベント
	 *
	 * @param {number} key
	 */
	const handleClickDeleteProfile = useCallback(
		(key: number) => {
			const newProfileField = _.without(profileFieldList, key);
			setProfileFieldList(newProfileField);
		},
		[profileFieldList],
	);

	const handleSubmit = (profilesDataForm: MyProfileDataState) => {
		const myProfiles = [];
		_.forEach(profilesDataForm.profiles, (profileData) => {
			profileData.static !== undefined ? myProfiles.push(profileData.static) : myProfiles.push(...profileData.dynamic);
		});
		dispatch(postMyProfileAsync(myProfiles));
	};

	return (
		<>
			<Create
				profileFieldList={profileFieldList}
				handleClickAddProfile={handleClickAddProfile}
				handleClickDeleteProfile={handleClickDeleteProfile}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default create;
