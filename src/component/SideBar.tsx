import React from 'react';
import { SideBars } from '~/type/SideBar';

const sideBar = (props: SideBars): JSX.Element => {
	return (
		<>
			<nav id="sidebar">
				{props.sideBar.map((value) => {
					return <div key={value.id}>{value.name}</div>;
				})}
			</nav>
		</>
	);
};

export default sideBar;
