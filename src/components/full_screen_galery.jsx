import { useEffect, useRef } from 'react';


import styles from '../css/FullScreenGallery.module.css'
import { motion, AnimatePresence } from "framer-motion"

export default function FullScreenGallery({ images, categories, changeCategory, currentCategory, exitFullScreen, initialSlide }) {
	const swiperRef = useRef(null);
	const thumbnailRef = useRef(null);

	useEffect(() => {
		const swiperContainer = swiperRef.current;
		const swiperThumbnail = thumbnailRef.current;

		const params = {
			keyboard: {
				enabled: true,
				onlyInViewport: false,
			},
			mousewheel: true,
			navigation: true,
			zoom: {
				maxRatio: 3,
				minRatio: 1,
			},
			initialSlide: initialSlide,
		};

		const thumbnailParams = {
			slidesPerView: 'auto',
			centeredSlides: true,

			spaceBetween: 30,
			mousewheel: true,
			slideToClickedSlide: true,
			initialSlide: initialSlide,
		};

		Object.assign(swiperContainer, params);
		Object.assign(swiperThumbnail, thumbnailParams);

		swiperContainer.initialize();
		swiperThumbnail.initialize();
	}, [initialSlide]);

	return (
		<div className={styles.FullScreenGallery}>
			<swiper-container
				class={styles.container}
				ref={swiperRef} init="false"
				controller-control={'.' + styles.thumbnail}
			>
				{images.map((img) =>
					<swiper-slide key={img.url}
					onClick={event => {
						if (event.target.tagName != 'IMG') {
							exitFullScreen();
						}
					}}
					>
						<div className="swiper-zoom-container">
							<motion.img
								src={img.url}
								alt=""
								layoutId={img.url}
							/>
						</div>
					</swiper-slide>
				)}
			</swiper-container>

			<swiper-container
				class={styles.thumbnail}
				ref={thumbnailRef} init="false"
				controller-control={'.' + styles.container}
				parallax="true"
			>
				{images.map((img) =>
					<swiper-slide key={img.url}>
						<img src={img.url} alt=""
							data-swiper-parallax-scale="0.8"
							data-swiper-parallax-duration="600"
							data-swiper-parallax="-15"
						/>
					</swiper-slide>
				)}
			</swiper-container>
		</div>
	)
}