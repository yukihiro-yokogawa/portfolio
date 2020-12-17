import React from 'react';
const Skill: React.FC = () => {
	return (
		<>
			<div className="content_wrap">
				<div className="content_small">
					<h3>フロントエンド</h3>
					<div className="wrap">
						<table className="borderless_table">
							<thead>
								<tr>
									<th scope="col1">技術</th>
									<th scope="col1">経験年数</th>
									<th scope="col1">スキル</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>JavaScript</td>
									<td>1年</td>
									<td>
										<p className="rate rate4"></p>
									</td>
								</tr>
								<tr>
									<td>ReactJs</td>
									<td>4ヶ月</td>
									<td>
										<p className="rate rate2_5"></p>
									</td>
								</tr>
								<tr>
									<td>JQuery</td>
									<td>4ヶ月</td>
									<td>
										<p className="rate rate2_5"></p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="content_small">
					<h3>バックエンド</h3>
					<div className="wrap">
						<table className="borderless_table">
							<thead>
								<tr>
									<th scope="col1">技術</th>
									<th scope="col1">経験年数</th>
									<th scope="col1">スキル</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										Java
										<br />
										(8,11,13,14)
									</td>
									<td>1年</td>
									<td>
										<p className="rate rate4"></p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className="content_wrap">
				<div className="content_small">
					<h3>データベース</h3>
					<div className="wrap">
						<table className="borderless_table">
							<thead>
								<tr>
									<th scope="col1">技術</th>
									<th scope="col1">経験年数</th>
									<th scope="col1">スキル</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										PostgreSql
										<br />
										(9,11,12)
									</td>
									<td>1年</td>
									<td>
										<p className="rate rate3_5"></p>
									</td>
								</tr>
								<tr>
									<td>
										MySql
										<br />
										(5.5)
									</td>
									<td>3ヶ月</td>
									<td>
										<p className="rate rate2_5"></p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="content_small">
					<h3>その他</h3>
					<div className="wrap">
						<table className="borderless_table">
							<thead>
								<tr>
									<th scope="col1">技術</th>
									<th scope="col1">経験年数</th>
									<th scope="col1">スキル</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Slack</td>
									<td>1年</td>
									<td>
										<p className="rate rate5"></p>
									</td>
								</tr>
								<tr>
									<td>trello</td>
									<td>6ヶ月</td>
									<td>
										<p className="rate rate4"></p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default Skill;
