import React from 'react';
import { forEach } from 'lodash';

const Work = (props): JSX.Element => {
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
							<td scope="col1"></td>
						</tr>
						<tr>
							<th scope="col1">工夫</th>
						</tr>
						<tr>
							<td scope="col1"></td>
						</tr>
						<tr>
							<th scope="col1">反省</th>
						</tr>
						<tr>
							<td scope="col1"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Work;
