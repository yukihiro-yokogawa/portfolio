import React from 'react';
import { SideBarStates } from '~/Type/SideBar';
import { List, ListItem, ListItemText } from '@material-ui/core';

const sideBar = React.memo(
	(props: SideBarStates): JSX.Element => {
		return (
			<>
				<List id="sidebar" component="nav">
					{props.sideBar.map((value) => {
						return (
							<ListItem
								key={value.id}
								button
								selected={props.selectedIndex === value.id}
								onClick={() => props.handleClick(value.id)}
							>
								<ListItemText primary={value.name} />
							</ListItem>
						);
					})}
				</List>
			</>
		);
	},
);

export default sideBar;
