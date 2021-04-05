import { Box, Container } from '@material-ui/core';
import React from 'react';
import ContentAddButton from '../ContentAddButton';
import { useStoreState } from '~/ducks/selector';
import { getDateString } from '~/util/conversionUtils';

const profile = (props: { myProfiles: any }): JSX.Element => {
	const profiles = useStoreState().profiles;

	return (
		<>
			<ContentAddButton linkHref="/Profile/create" linkAs="/profile/edit" query={null} type="new" />
			<Container style={{ width: '80%', marginTop: 50 }}>
				{profiles.map((profile, index) => (
					<Box key={index} alignItems="center" width={1}>
						<h3 className="title">{profile.name}</h3>
						{props.myProfiles[profile.displayOrder]?.map((myProfile, index) =>
							myProfile.date !== null ? (
								<ul key={index} className="timeline">
									<li>
										<p className="timeline-date">{getDateString(myProfile.date)}</p>
										<div className="timeline-content">
											<h3>{myProfile.title}</h3>
											<pre>{myProfile.description}</pre>
										</div>
									</li>
								</ul>
							) : (
								<div key={index}>{myProfile.description}</div>
							),
						)}
					</Box>
				))}
			</Container>
		</>
	);
};

export default profile;
