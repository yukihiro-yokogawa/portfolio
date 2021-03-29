import { Box, Container } from '@material-ui/core';
import React from 'react';
import ContentAddButton from '../ContentAddButton';

const profile: React.FC = () => {
	return (
		<>
			<ContentAddButton linkHref="/Profile/create" linkAs="/profile/edit" query={null} type="new" />
			<Container style={{ width: '80%', marginTop: 50 }}>
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
