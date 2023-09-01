import { useEffect, useRef } from 'react';


import styles from '../css/FullScreenGallery.module.css'
import { motion } from "framer-motion"
import CloseIcon from '@mui/icons-material/Close';

export default function FullScreenGallery({ images, categories, changeCategory, currentCategory, exitFullScreen, initialSlide }) {
	const swiperRef = useRef(null);
	const thumbnailRef = useRef(null);

	useEffect(() => {
		function win_onkeydown_handler(event) {
			if (event.key === 'Escape') {
				event.returnValue = false;
				exitFullScreen();
			}
		}

		document.addEventListener('keydown', win_onkeydown_handler);

		return () => { document.removeEventListener('keydown', win_onkeydown_handler) };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
	}, [initialSlide, categories]);

	// useEffect(() => {
	// 	const swiperContainer = swiperRef.current;
	// 	const swiperThumbnail = thumbnailRef.current;

	// 	swiperContainer.
	// }, [initialSlide]);

	return (
		<div className={styles.FullScreenGallery}>
			<div className={styles.Overlay} />

			<div className={styles.heading}>
				<div className={styles.Spacer} />

				<div className={styles.Category}>
					<motion.button
						onClick={(e) => changeCategory(e, null)}
						data-active={currentCategory == null}
						layoutId={'seeAllCategory'}
					>
						Vezi tot
					</motion.button>

					{categories.map(({ name }) =>
						<motion.button
							key={name}
							onClick={(e) => changeCategory(e, name)}
							data-active={currentCategory == name}
							layoutId={name}
						>
							{name}
						</motion.button>
					)}
				</div>

				<button
					className={styles.ExitButton}
					type="button"
					onClick={exitFullScreen}
				>
					<CloseIcon />
				</button>
			</div>


			<swiper-container
				class={styles.container}
				ref={swiperRef} init="false"
				controller-control={'.' + styles.thumbnail}
			>
				{images.map((img) =>
					<swiper-slide
						key={img.url}
						onClick={event => {
							if (event.target.tagName != 'IMG') {
								exitFullScreen();
							}
						}}
					>

						<div className="swiper-zoom-container">
							{
								img.pdf ?
									<motion.img
										src={img.url}
										alt={img.alt}
										layoutId={img.url}
										onClick={event => {
											event.preventDefault();
											window.open(img.pdf);
											return true;
										}}
									/>
									:
									<motion.img
										src={img.url}
										alt={img.alt}
										layoutId={img.url}
									/>
							}
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
						<img src={img.url}
							data-swiper-parallax-scale="0.8"
							data-swiper-parallax-duration="600"
							data-swiper-parallax="-15"
							alt={img.alt}
						/>
					</swiper-slide>
				)}
			</swiper-container>
		</div>
	)
}