import { Box, Container } from '@material-ui/core';
import React from 'react';
import ContentAddButton from '../ContentAddButton';
import _ from 'lodash';
import { useStoreState } from '~/ducks/selector';

const profile: React.FC = () => {
	const profiles = useStoreState().profiles;
	const myProfile = _.mapKeys(useStoreState().myProfiles, 'profile.displayOrder');

	return (
		<>
			<ContentAddButton linkHref="/Profile/create" linkAs="/profile/edit" query={null} type="new" />
			<Container style={{ width: '80%', marginTop: 50 }}>
				{profiles.map((profile, index) => (
					<Box key={index} alignItems="center" width={1}>
						<h3 className="title">{profile.name}</h3>
						{myProfile[profile.displayOrder] !== undefined ? (
							myProfile[profile.displayOrder]?.date !== null ? (
								<>
									<ul className="timeline">
										<li>
											<p className="timeline-date">{myProfile[profile.displayOrder]?.date}</p>
											<div className="timeline-content">
												<h3>{myProfile[profile.displayOrder]?.title}</h3>
												<pre>{myProfile[profile.displayOrder]?.description}</pre>
											</div>
										</li>
									</ul>
								</>
							) : (
								<div>{myProfile[profile.displayOrder]?.description}</div>
							)
						) : null}
					</Box>
				))}
			</Container>
		</>
	);
};

export default profile;
