import React from 'react';
import Image from 'next/image';

const Work: React.FC = () => {
	return (
		<>
			<div className="content_big work">
				<table>
					<tbody>
						<tr>
							<th scope="col1">サンプル画像</th>
						</tr>
						<tr>
							<td scope="col1">
								<Image src="/sample.jpg" width={1920} height={1080} />
							</td>
						</tr>
						<tr>
							<th scope="col1">Git</th>
						</tr>
						<tr>
							<td scope="col1"></td>
						</tr>
						<tr>
							<th scope="col1">使用技術</th>
						</tr>
						<tr>
							<td scope="col1"></td>
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
