const testImages = [
	new GalleryImage('https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Interior),
	new GalleryImage('https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', ImageCategory.Interior),
	new GalleryImage('https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Exterior),
	new GalleryImage('https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Exterior),
	new GalleryImage('https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Exterior),
	new GalleryImage('https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80', ImageCategory.Proiect),
	new GalleryImage('https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80', ImageCategory.Proiect),
	new GalleryImage('https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Proiect),
	new GalleryImage('https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcREj22c-wMNL5IDmU99v8G7voUl17Yxm0JJqMLqttdPT4DnaB99zqVK7HWiNzjP3aZnzCEf-ikAqb2yiDk', ImageCategory.Exterior),
	new GalleryImage('https://www.daibau.ro/images/backgrounds/12/1small.jpg', ImageCategory.Interior),
	new GalleryImage('https://iva.training/wp-content/uploads/2021/07/pov-arhitect.png', ImageCategory.Interior),
];

import { useEffect, useState} from 'react';
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
	const {containerRef, dragged} = useHorizontalDrag();
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
				{images.map((img, index) =>
					<motion.button
						key={img.url}
						onClick={() => goFullScreen(index)}
						style={{
							backgroundImage: `url(${img.url})`,
							backgroundSize: 'cover',
						}}
						layoutId={img.url}
					/>
				)}
			</div>
		</div>
	);
}