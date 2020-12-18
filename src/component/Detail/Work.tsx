import React from 'react';
import { Work as WorkType } from '~/Type/Work';

const Work = (props: { work: WorkType }): JSX.Element => {
	return (
		<>
			<div className="content_big work">
				<table>
					<tbody>
						<tr>
							<th scope="col1">Git</th>
						</tr>
						<tr>
							<td scope="col1">{props.work.gitUrl}</td>
						</tr>
						<tr>
							<th scope="col1">使用技術</th>
						</tr>
						<tr>
							<td scope="col1">
								{props.work.techniqueArr.map((value, key) => {
									return <div key={key}>{`${value.techniqueName}${value.version}`}</div>;
								})}
							</td>
						</tr>
						<tr>
							<th scope="col1">機能</th>
						</tr>
						<tr>
							<td scope="col1">
								<div>{props.work.feature}</div>
							</td>
						</tr>
						<tr>
							<th scope="col1">工夫点</th>
						</tr>
						<tr>
							<td scope="col1">
								<div>{props.work.point}</div>
							</td>
						</tr>
						<tr>
							<th scope="col1">反省点</th>
						</tr>
						<tr>
							<td scope="col1">
								<div>{props.work.reflections}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Work;
