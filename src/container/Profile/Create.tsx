import React, { useCallback, useContext, useState } from 'react';
import Create from '~/component/Profile/Create';
import { MyProfileDataState, MyProfileState } from '~/Type/Profile';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { postMyProfileAsync } from '~/ducks/Slice/MyProfileSlice';
import { MyProfilesContext } from '~/pages/Profile/create';

const create = (): JSX.Element => {
	const dispatch = useDispatch();
	const carrerProfile: Array<MyProfileState> =
		Object.keys(useContext(MyProfilesContext)).length !== 0
			? _(useContext(MyProfilesContext))
					.map((myProfile) => {
						if (myProfile[0]?.profile.name === '経歴') {
							return myProfile;
						}
					})
					.compact()
					.flattenDeep()
					.value()
			: [{ static: {} }];

	const [careerFieldList, setCareerFieldList] = useState(carrerProfile.map((_, i) => i));

	/**
	 * 技術新規追加フォーム増加イベント.
	 */
	const handleClickAddProfile = useCallback(() => {
		const newCareerField = careerFieldList.length == 0 ? 0 : _.max(careerFieldList) + 1;
		setCareerFieldList([...careerFieldList, newCareerField]);
	}, [careerFieldList]);

	/**
	 * 技術新規追加フォーム減少イベント
	 *
	 * @param {number} key
	 */
	const handleClickDeleteProfile = useCallback(
		(key: number) => {
			const newCareerField = _.without(careerFieldList, key);
			setCareerFieldList(newCareerField);
		},
		[careerFieldList],
	);

	const handleSubmit = (profilesDataForm: MyProfileDataState) => {
		const myProfiles = [];
		_.forEach(profilesDataForm.myProfiles, (profileData) => {
			profileData.static !== undefined ? myProfiles.push(profileData.static) : myProfiles.push(...profileData.dynamic);
		});
		dispatch(postMyProfileAsync(myProfiles));
	};

	return (
		<>
			<Create
				careerFieldList={careerFieldList}
				handleClickAddProfile={handleClickAddProfile}
				handleClickDeleteProfile={handleClickDeleteProfile}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default create;
