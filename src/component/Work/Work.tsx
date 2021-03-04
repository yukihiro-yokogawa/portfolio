import React from 'react';
import { ProjectState } from '~/Type/Project';
import { Box, Container } from '@material-ui/core';
import { Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import ContentAddButton from '../ContentAddButton';

const Work = (props: { project: ProjectState }): JSX.Element => {
	return (
		<>
			<ContentAddButton linkHref="/Work/create" linkAs="/work/new" query="new" />
			<Container>
				<Table>
					<TableBody displayRowCheckbox={false}>
						<TableRow>
							<TableHeaderColumn scope="col1">Git</TableHeaderColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn scope="col1">{props.project?.gitUrl}</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableHeaderColumn scope="col1">使用技術</TableHeaderColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn scope="col1">
								{props.project?.projectTechniques?.map((value, key) => {
									return <div key={key}>{`${value.technique.name}${value.technique.version}`}</div>;
								})}
							</TableRowColumn>
						</TableRow>
						{props.project?.projectAbouts?.map((value, key) => {
							return (
								<Box
									component={() => {
										return (
											<>
												<TableRow>
													<TableHeaderColumn scope="col1">{value.about.name}</TableHeaderColumn>
												</TableRow>
												<TableRow>
													<TableRowColumn scope="col1">
														<div>{value.description}</div>
													</TableRowColumn>
												</TableRow>
											</>
										);
									}}
									key={key}
								></Box>
							);
						})}
					</TableBody>
				</Table>
				<ContentAddButton linkHref="/Work/create" linkAs="/work/edit" query={props.project} />
			</Container>
		</>
	);
};

export default Work;
