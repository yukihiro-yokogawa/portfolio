import { Box } from '@material-ui/core';
import React from 'react';
import ContentAddButton from '../ContentAddButton';

const Skill = (props: { mySkills: Array<any> }): JSX.Element => {
	return (
		<>
			<ContentAddButton linkHref="/Skill/create" linkAs="/skill/edit" query={props.mySkills} />
			{props.mySkills.map((mySkill, index) =>
				mySkill.techniques.length !== 0 ? (
					<Box
						alignItems="center"
						display="flex"
						flexWrap="wrap"
						style={{ marginTop: '10px', justifyContent: ' space-between' }}
						key={index}
					>
						<div className="content_small">
							<h3>{mySkill.techniqueType}</h3>
							<div className="wrap">
								<table className="borderless_table">
									<thead>
										<tr>
											<th scope="col1">技術</th>
											<th scope="col1">スキル</th>
										</tr>
									</thead>
									{mySkill.techniques.map((technique, index2) => (
										<tbody key={`${index}_${index2}`}>
											<tr>
												<td>{technique.name}</td>
												<td>
													<p className={`rate rate${technique.level}`}></p>
												</td>
											</tr>
										</tbody>
									))}
								</table>
							</div>
						</div>
					</Box>
				) : (
					''
				),
			)}
		</>
	);
};

export default Skill;
