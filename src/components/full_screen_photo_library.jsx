const libraryTestUrls = [
	'./images/imagini bloc suceava pentru anunt/favorites/1.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/2.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/3.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/4.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/5.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/6.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/7.jpg',
	'./images/imagini bloc suceava pentru anunt/favorites/8.jpg',
];

import { useEffect, useRef } from 'react';

export default function FullScreenPhotoLibrary() {
	const swiperRef = useRef(null);
	const thumbRef = useRef(null);

	useEffect(() => {
		const swiperContainer = swiperRef.current;
		const swiperThumb = thumbRef.current;

		const params = {
			mousewheel: {
				forceToAxis: true,
			},
			centeredSlides: true,
			keyboard: true,
			thumbs: {
				swiper: swiperThumb,
			},
			loop: true,
		};

		const thumbParams = {
			slidesPerView: 5,
			centeredSlides: true,
			loop: true,
		};

		Object.assign(swiperContainer, params);
		Object.assign(swiperThumb, thumbParams);

		swiperThumb.initialize();
		swiperContainer.initialize();
	}, []);

	return (
		<section className='PhotoLibrary'>
			<div className="Container">
				<swiper-container init="false" ref={swiperRef} class='SwiperContainer'>
					{libraryTestUrls.map((src) => {
						return (
							<swiper-slide key={src} >
								<div className="Image">
									<img src={src} />
								</div>
							</swiper-slide>
						);
					})}

				</swiper-container>
				<swiper-container init="false" ref={thumbRef} class='SwiperThumb'>
					{libraryTestUrls.map((src) => {
						return (
							<swiper-slide key={src} >
								<div className="Image">
									<img src={src} />
								</div>
							</swiper-slide>
						);
					})}

				</swiper-container>
			</div>
		</section>
	);
}