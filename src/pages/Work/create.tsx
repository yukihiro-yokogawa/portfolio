import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Create from '~/container/Work/Create';
import { getAboutsAsync } from '~/ducks/Slice/AboutSlice';
import { useDispatch } from 'react-redux';
import { getProjectByIdAsync } from '~/ducks/Slice/ProjectSlice';
const create: React.FC = () => {
	const router = useRouter();
	const projectId = (router.query.projectId as unknown) as number;
	const dispatch = useDispatch();

	// レンダリング後に実行されるアクション関数.
	useEffect(() => {
		dispatch(getProjectByIdAsync(projectId));
		dispatch(getAboutsAsync());
	}, [dispatch, projectId]);

	return (
		<div>
			<Create />
		</div>
	);
};

export default create;
