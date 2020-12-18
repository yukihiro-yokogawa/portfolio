import React from 'react';
import { SideBars } from '~/Type/SideBar';

const sideBar = (props: SideBars): JSX.Element => {
	return (
		<>
			<nav id="sidebar">
				{props.sideBar.map((value) => {
					return (
						<div key={value.id} onClick={() => props.handleClick(value.id)}>
							{value.name}
						</div>
					);
				})}
			</nav>
		</>
	);
};

export default sideBar;
