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

import { useEffect, useState, useRef, forwardRef } from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion } from "framer-motion"

import { Gallery, GalleryImage, ImageCategory, LoopGallery } from '../js/gallery';

import FullScreenGallery from './full_screen_galery';
import useHorizontalDrag from '../hooks/useHorizontalDrag';

import styles from '../css/PhotoLibrary.module.css';


export default function PhotoLibrary() {
	const galery = new Gallery(testImages);
	const categories = galery.getCategories;

	const [fullScreen, setFullScreen] = useState(null);
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
	}

	function exitFullScreen() {
		setFullScreen(null);
	}

	function goFullScreen(index) {
		setFullScreen(index);
	}

	return (
		<section className={styles.PhotoLibrary}>
			{fullScreen != null &&
				<FullScreenGallery images={images} initialSlide={fullScreen} categories={categories} changeCategory={changeCategory} currentCategory={category} exitFullScreen={exitFullScreen} />
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









function Slider4({ images, goFullScreen }) {
	const containerRef = useHorizontalDrag();
	const [scrollEl, setScrollElement] = useState(null);

	useEffect(() => {
		setScrollElement(containerRef.current);
	}, [containerRef]);

	return (
		<>
			<div className={styles.Slider} ref={containerRef}>
				<ParallaxProvider scrollAxis="horizontal" scrollContainer={scrollEl}>
					{images.map((img, index) => {
						return (
							<motion.div
								className="SliderImage"
								key={img.url}

							// layoutId={img.url}
							>
								<ParallaxBanner
									onClick={() => goFullScreen(index)}
									layers={[{
										image: `'${img.url}'`,
										scale: [0.75, 0.95],
										easing: [0.75, 2, 0.47, 0.93],
									}]}
									className={styles.ImageParallax}
									draggable='false'
								/>
							</motion.div>
						);
					})}
				</ParallaxProvider>
			</div>
			<div className={styles.SliderViewFullLibrary}>
				<button onClick={() => goFullScreen(0)}>Vezi toata galeria</button>
			</div>
		</>
	);
}

function Grid({ images, categories, changeCategory, currentCategory, goFullScreen }) {
	const [animationParent] = useAutoAnimate();

	return (
		<div className={styles.Grid}>
			<div className={styles.GridCategory}>
				<button
					onClick={(e) => changeCategory(e, null)}
					data-active={currentCategory == null}
				>
					Vezi tot
				</button>

				{categories.map(({ name }) =>
					<button
						key={name}
						onClick={(e) => changeCategory(e, name)}
						data-active={currentCategory == name}
					>
						{name}
					</button>
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


















function Grid2() {
	const galery = new Gallery(testImages);
	const currentCategory = useRef();
	const [animationParent] = useAutoAnimate();
	const [images, setImages] = useState([]);


	function category(event, name) {

		delete currentCategory.current.dataset.active;
		currentCategory.current = event.currentTarget;
		currentCategory.current.dataset.active = 'true';

		setImages(
			galery.images.filter(img =>
				img.category == name || name == null
			)
		);
	}

	useEffect(() => {
		currentCategory.current.dataset.active = 'true';
		setImages(galery.images);
	}, [galery.images]);

	return (
		<div className="Grid">
			<div className='GridCategory'>
				<button onClick={(e) => category(e, null)} ref={currentCategory}> Vezi tot</button>

				{galery.getCategories.map(({ name }) =>
					<button key={name} onClick={(e) => category(e, name)}>
						{name}
					</button>
				)}
			</div>

			<div className='GridImages' ref={animationParent}>
				{images.map((img) =>
					<button
						key={img.url}
						onClick={() => alert('hey')}
						style={{
							backgroundImage: `url(${img.url})`,
							backgroundSize: 'cover',
						}}
					/>
				)}
			</div>
		</div>
	);
}














function Slider2() {
	const containerRef = useHorizontalDrag();
	const [scrollEl, setScrollElement] = useState(null);

	useEffect(() => {
		setScrollElement(containerRef.current);
	}, [containerRef]);

	return (
		<>
			<div className='Slider' ref={containerRef}>
				<ParallaxProvider scrollAxis="horizontal" scrollContainer={scrollEl}>
					{libraryTestUrls.map((src) => {
						return (
							<div className="SliderImage" key={src}>
								<ParallaxBanner
									layers={[{
										image: `'${src}'`,
										scale: [0.75, 0.95],
										easing: [0.75, 2, 0.47, 0.93],
									}]}
									className='ImageParallax'
									draggable='false'
								/>
							</div>
						);
					})}
				</ParallaxProvider>
			</div>
			<div className="SliderViewFullLibrary">
				<button>Vezi toata galeria</button>
			</div>
		</>
	);
}

















function Helper() {
	const galery = new Gallery(testImages);
	const imgsRef = useRef([]);
	const categoryimgsRef = useRef([]);
	const contanerRef = useRef();

	function next() {
		const prevIndex = galery.index;
		try {
			galery.nextImg();
		} catch (e) { /* empty */ }

		delete imgsRef.current[prevIndex].dataset.active;
		imgsRef.current[galery.index].dataset.active = 'true';
	}
	function prev() {
		const prevIndex = galery.index;
		try {
			galery.prevImg();
		} catch (e) { /* empty */ }

		delete imgsRef.current[prevIndex].dataset.active;
		imgsRef.current[galery.index].dataset.active = 'true';
	}
	function viewFullLibrary() {
		const bool = contanerRef.current.dataset.viewFullLibrary;
		if (bool == 'true') {
			contanerRef.current.dataset.viewFullLibrary = false;
			imgsRef.current[galery.index].dataset.active = 'true';
		} else {
			contanerRef.current.dataset.viewFullLibrary = true;
			delete imgsRef.current[galery.index].dataset.active;
		}
	}
	function category(name) {
		const prevIndex = galery.index;
		const prevCategoryIndex = galery.currentCategoryIndex - 1;

		if (galery.currentCategory.name == name && galery.loop == LoopGallery.none) {
			galery.loop = LoopGallery.loopAll;
			galery.images.forEach((img, i) => imgsRef.current[i].hidden = false);
			delete categoryimgsRef.current[galery.currentCategoryIndex - 1].dataset.active;
			return;
		}

		try {
			galery.goToCategory(name);
		} catch (e) {
			console.log(e);
		}


		const currentCategory = galery.currentCategory;

		galery.loop = LoopGallery.none;

		galery.images.forEach((img, i) => {
			if (img.category == currentCategory.name) {
				imgsRef.current[i].hidden = false;
			} else {
				imgsRef.current[i].hidden = true;
			}
		});

		delete imgsRef.current[prevIndex].dataset.active;
		if (contanerRef.current.dataset.viewFullLibrary == false)
			imgsRef.current[galery.index].dataset.active = 'true';

		delete categoryimgsRef.current[prevCategoryIndex].dataset.active;
		categoryimgsRef.current[galery.currentCategoryIndex - 1].dataset.active = 'true';
	}

	useEffect(() => {
		if (imgsRef.current && imgsRef.current[0])
			imgsRef.current[0].dataset.active = 'true';
	}, []);

	return (
		<div className="GridContainer" ref={contanerRef}>
			<div className='Category'>
				{galery.getCategories.map(({ name }, i) =>
					<button
						key={name}
						onClick={() => category(name)}
						ref={(ref) => categoryimgsRef.current[i] = ref}
					>
						{name}
					</button>
				)}
			</div>
			<div className='ViewFullAndPrev'>
				<button className='ViewFullLibrary' onClick={viewFullLibrary}>Vezi toata galeria</button>
				<button className='Prev' onClick={prev}>Precedent</button>
			</div>
			<button className='Next' onClick={next}>Urmatorul</button>




			<div className='GridImages'>
				{galery.images.map((img, i) =>
					<div
						key={img.url}
						className='GridImageContainer'>
						<button
							className='GridButton'

							ref={(ref) => imgsRef.current[i] = ref}
							style={{
								backgroundImage: `url(${img.url})`,
								backgroundSize: 'cover',
							}}
						/>
					</div>
				)}
			</div>

			<div className='FullScreenImage'>
				{galery.images.map((img, i) =>
					<img
						src={img.url}
						key={img.url}
						ref={(ref) => imgsRef.current[i] = ref}
					/>
				)}
			</div>
		</div>
	);
}

const Cell = forwardRef(({ children, className, ...props }, ref) => (
	<div className={`Cell ${className ?? ''}`} ref={ref} {...props}>
		{/* <div className="overlay" /> */}
		{children}
		<div className='CellPadding-top' />
		<div className='CellPadding-right' />
		<div className='CellPadding-bottom' />
		<div className='CellPadding-left' />
		<div className='CellCorner top left' />
		<div className='CellCorner top right' />
		<div className='CellCorner bottom left' />
		<div className='CellCorner bottom right' />
	</div>
));