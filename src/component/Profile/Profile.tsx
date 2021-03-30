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
				<Box alignItems="center" width={1}>
					<h3 className="title">自己紹介</h3>
					<div>
						自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。
					</div>
				</Box>
				<Box alignItems="center" width={1}>
					<h3 className="title">直近の学習状況</h3>
					<ul className="timeline">
						<li>
							<p className="timeline-date">Docker</p>
							<div className="timeline-content">
								<h3>Dockerの基礎</h3>
								<p>
									Dockerの基礎の学習詳細。Dockerの基礎の学習詳細。Dockerの基礎の学習詳細。Dockerの基礎の学習詳細。Dockerの基礎の学習詳細。Dockerの基礎の学習詳細。Dockerの基礎の学習詳細。Dockerの基礎の学習詳細。
								</p>
							</div>
						</li>
					</ul>
				</Box>
				<Box alignItems="center" width={1}>
					<h3 className="title">経歴</h3>
					<ul className="timeline">
						<li>
							<p className="timeline-date">2007年2月</p>
							<div className="timeline-content">
								<h3>経歴のタイトル</h3>
								<p>経歴の詳細。経歴の詳細。経歴の詳細。経歴の詳細。経歴の詳細。経歴の詳細。</p>
							</div>
						</li>
					</ul>
				</Box>
			</Container>
		</>
	);
};

export default profile;
