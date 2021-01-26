import React from 'react';
import { ProjectState } from '~/Type/Project';

const Work = (props: { project: ProjectState }): JSX.Element => {
	return (
		<>
			<div className="content_big work">
				<table>
					<tbody>
						<tr>
							<th scope="col1">Git</th>
						</tr>
						<tr>
							<td scope="col1">{props.project?.gitUrl}</td>
						</tr>
						<tr>
							<th scope="col1">使用技術</th>
						</tr>
						<tr>
							<td scope="col1">
								{props.project?.projectTechniques?.map((value, key) => {
									return <div key={key}>{`${value.technique.name}${value.technique.version}`}</div>;
								})}
							</td>
						</tr>

						{props.project?.projectAbouts?.map((value, key) => {
							return (
								<>
									<tr key={key}>
										<th scope="col1">{value.about.name}</th>
									</tr>
									<tr>
										<td scope="col1">
											<div>{value.description}</div>
										</td>
									</tr>
								</>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Work;
