import React from 'react';
import { forEach } from 'lodash';

const sideBar: React.FC = (props) => {
	return (
		<>
			{/* バックエンドAPIから取得予定 */}
			<nav id="sidebar">
				<div data-num="1">1 アンケート</div>
				<hr />
				<div>2 ロジカルシンキング</div>
			</nav>
		</>
	);
};

export default sideBar;
