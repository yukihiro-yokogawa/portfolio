import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

const slideshow = (props: { imgs: Array<string> }): JSX.Element => {
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
				{props.imgs.map((value, key) => {
					return (
						<div key={key}>
							<Image loading="lazy" src={value} width={1920} height={1080} />
						</div>
					);
				})}
			</Slider>
		</>
	);
};

export default slideshow;
