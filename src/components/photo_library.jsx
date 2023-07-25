
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

import { useEffect, useState, useRef } from 'react';

import '../css/Photo_library.css';
import useHorizontalDrag from '../hooks/useHorizontalDrag';

import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { Gallery, GalleryImage, ImageCategory, LoopGallery } from '../js/gallery';

export default function PhotoLibrary() {
	const [scrollEl, setScrollElement] = useState(null);

	const containerRef = useHorizontalDrag();

	useEffect(() => {
		setScrollElement(containerRef.current);
	}, [containerRef]);

	return (
		<section className='PhotoLibrary'>
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

			<Helper />
		</section>
	)
}

const testImages = [
	new GalleryImage('https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Interior),
	new GalleryImage('https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', ImageCategory.Interior),
	new GalleryImage('https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Exterior),
	new GalleryImage('https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Exterior),
	new GalleryImage('https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Exterior),
	new GalleryImage('https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80', ImageCategory.Proiect),
	new GalleryImage('https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80', ImageCategory.Proiect),
	new GalleryImage('https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', ImageCategory.Proiect),
];

function Helper() {
	const galery = new Gallery(testImages);
	const refs = useRef([]);

	function next() {
		const prevIndex = galery.index;
		try {
			galery.nextImg();
		} catch (e) { /* empty */ }

		delete refs.current[prevIndex].dataset.active;
		refs.current[galery.index].dataset.active = 'true';
	}
	function prev() {
		const prevIndex = galery.index;
		try {
			galery.prevImg();
		} catch (e) { /* empty */ }

		delete refs.current[prevIndex].dataset.active;
		refs.current[galery.index].dataset.active = 'true';
	}
	function viewFullLibrary() {
		console.log('viewFullLibrary');
	}
	function category(name) {
		const prevIndex = galery.index;

		if(galery.currentCategory.name == name && galery.loop == LoopGallery.none) {
			galery.loop = LoopGallery.loopAll;
			galery.images.forEach((img, i) => refs.current[i].hidden = false );
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
				refs.current[i].hidden = false;
			} else {
				refs.current[i].hidden = true;
			}
		});

		delete refs.current[prevIndex].dataset.active;
		refs.current[galery.index].dataset.active = 'true';
	}

	useEffect(() => {
		// galery.urls.map((url, index) => {
		// 	refs.current[index].dataset.active = 'false';
		// });
	}, [galery.urls]);

	return (
		<div className="GridContainer">
			<div className='Category'>
				{galery.getCategories.map(({ name }) =>
					<button key={name} onClick={() => category(name)}>{name}</button>
				)}
			</div>
			<div className='ViewFullAndPrev'>
				<div className='ViewFullLibrary'>
					<button onClick={viewFullLibrary}>Vezi toata galeria</button>
				</div>
				<div className='Prev'>
					<button onClick={prev}>Precedent</button>
				</div>
			</div>
			<div className='Next'>
				<button onClick={next}>Urmatorul</button>
			</div>

			{galery.images.map((img, i) => {
				return (
					<div className='GridImage'
						key={img.url}
						ref={(ref) => refs.current[i] = ref}
					>
						<img src={img.url} />
					</div>
				);
			})}
		</div>
	);
}