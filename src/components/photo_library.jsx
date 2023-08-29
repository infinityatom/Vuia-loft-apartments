const testImages = [
	new GalleryImage('./renders/building-1.jpg', ImageCategory.Randari),
	new GalleryImage('./renders/building-2.jpg', ImageCategory.Randari),
	new GalleryImage('./renders/building-3.jpg', ImageCategory.Randari),
	new GalleryImage('./renders/building-4.jpg', ImageCategory.Randari),
	new GalleryImage('./renders/building-5.jpg', ImageCategory.Randari),
	new GalleryImage('./renders/building-6.jpg', ImageCategory.Randari),
	new GalleryImage('./renders/building-7.jpg', ImageCategory.Randari),

	new GalleryImage('./images/picture1.jpg', ImageCategory.Poze),

	new GalleryImage('./suprafete/DEMISOL.jpg', ImageCategory.PDF, './suprafete/DEMISOL.pdf'),
	new GalleryImage('./suprafete/PARTER.jpg', ImageCategory.PDF, './suprafete/PARTER.pdf'),
	new GalleryImage('./suprafete/ETAJ-1.jpg', ImageCategory.PDF, './suprafete/ETAJ-1.pdf'),
	new GalleryImage('./suprafete/ETAJ-2.jpg', ImageCategory.PDF, './suprafete/ETAJ-2.pdf'),
	new GalleryImage('./suprafete/ETAJ-3.jpg', ImageCategory.PDF, './suprafete/ETAJ-3.pdf'),
	new GalleryImage('./suprafete/ETAJ-4.jpg', ImageCategory.PDF, './suprafete/ETAJ-4.pdf'),
];

import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion } from "framer-motion"

import { Gallery, GalleryImage, ImageCategory } from '../js/gallery';

import FullScreenGallery from './full_screen_galery';
import useHorizontalDrag from '../hooks/useHorizontalDrag';

import styles from '../css/PhotoLibrary.module.css';


export default function PhotoLibrary() {
	const galery = new Gallery(testImages);
	const categories = galery.getCategories;

	const [fullScreen, setFullScreen] = useState(null);
	const [imgIndex, setImgIndex] = useState(0);
	const [category, setCategory] = useState(null);
	const [images, setImages] = useState(galery.images);
	const [smallWindowSize, setSmallWindowSize] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768)
				setSmallWindowSize(true);
			else
				setSmallWindowSize(false)
		};

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	function changeCategory(event, name) {
		setImages(
			galery.images.filter(img =>
				img.category == name || name == null
			)
		);
		setCategory(name);
		setImgIndex(0);
	}

	function exitFullScreen() {
		setFullScreen(false);
	}

	function goFullScreen(index) {
		setImgIndex(index);
		setFullScreen(true);
	}

	return (
		<section className={styles.PhotoLibrary}>
			{fullScreen &&
				<FullScreenGallery images={images} initialSlide={imgIndex} categories={categories} changeCategory={changeCategory} currentCategory={category} exitFullScreen={exitFullScreen} />
			}
			{smallWindowSize ? (
				<Slider images={images} goFullScreen={goFullScreen} changeCategory={changeCategory} />
			) : (
				<Grid images={images} categories={categories} changeCategory={changeCategory} currentCategory={category} goFullScreen={goFullScreen} />
			)}
		</section>
	)
}

function Slider({ images, goFullScreen, changeCategory }) {
	const { containerRef, dragged } = useHorizontalDrag();
	// const [animationParent] = useAutoAnimate();
	return (
		<>
			<div
				className={styles.Slider}
				ref={containerRef}
			// ref={animationParent}
			>
				{images.map((img, index) => {
					return (
						<motion.div
							className={styles.Slide}
							key={img.url}
							layoutId={img.url}
							onClick={() => !dragged.current && goFullScreen(index)}
						>
							<img
								src={img.url}
								draggable='false'
							/>
						</motion.div>
					);
				})}
			</div>
			<div className={styles.SliderButton}>
				<button onClick={() => {
					changeCategory(null);
					goFullScreen(0);
				}}>Vezi toata galeria</button>
			</div>
		</>
	);
}

function Grid({ images, categories, changeCategory, currentCategory, goFullScreen }) {
	const [animationParent] = useAutoAnimate();

	return (
		<div className={styles.Grid}>
			<div className={styles.GridCategory}>
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

			<div className={styles.GridImages} ref={animationParent}>
				{images.map((img, index) => {
					if (img.category == ImageCategory.PDF) {
						return <motion.button
							key={img.url}
							onClick={() => goFullScreen(index)}
							style={{
								backgroundSize: 'cover',
								padding: 0,
							}}
							layoutId={img.url}
						>
							<embed
								src={img.url}
								width="100%"
								height="100%"
								style={{
									pointerEvents: "none",
								}}
								type="application/pdf"
							/>
						</motion.button>
					}

					return <motion.button
						key={img.url}
						onClick={() => goFullScreen(index)}
						style={{
							backgroundImage: `url(${img.url})`,
							backgroundSize: 'cover',
						}}
						layoutId={img.url}
					/>
				}
				)}
			</div>
		</div>
	);
}