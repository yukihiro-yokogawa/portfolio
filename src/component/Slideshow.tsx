import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

const slideshow: React.FC = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<>
			<Slider {...settings} className="content_big slideShow">
				<div>
					<Image src="/img/ancate/ancate_top.png" width={1920} height={1080} />
				</div>
				<div>
					<Image src="/img/ancate/ancate_content.png" width={1920} height={1080} />
				</div>
				<div>
					<Image src="/img/ancate/ancate_edit.png" width={1920} height={1080} />
				</div>
				<div>
					<Image src="/img/ancate/ancate_admin.png" width={1920} height={1080} />
				</div>
				<div>
					<Image src="/img/ancate/ancate_admin_edit.png" width={1920} height={1080} />
				</div>
				<div>
					<Image src="/img/ancate/ancate_userinsert.png" width={1920} height={1080} />
				</div>
				<div>
					<Image src="/img/ancate/ancate_userprofile.png" width={1920} height={1080} />
				</div>
			</Slider>
		</>
	);
};

export default slideshow;
