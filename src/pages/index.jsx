
import { useState, Suspense, lazy, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
register();

import Intro from '../pages/intro';
import Header from '../components/header';

// email api key
// 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
// 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

// const PhotoLibrary = lazy(() => import('../components/photo_library'));
// const Apartments = lazy(() => import('../components/apartments'));
// const Location = lazy(() => import('../components/location'));
// const Questions = lazy(() => import('../components/questions'));
// const Contact = lazy(() => import('../components/contact'));
// const Footer = lazy(() => import('../components/footer'));

import PhotoLibrary from '../components/photo_library';
import Apartments from '../components/apartments';
import Location from '../components/location';
import Questions from '../components/questions';
import Contact from '../components/contact';
import Footer from '../components/footer';


import '../css/Index.css';


export default function Index() {
	const [introLoaded, setIntroLoaded] = useState(false);

	return (
		<>
			{/* <Intro onLoaded={() => {
				setIntroLoaded(true)
			}} />
			{introLoaded ? <Content /> : null} */}
			<Content />

		</>
	)
}

function Content() {
	return (
		<>
			<Header />
			{/* <Suspense> */}
				<PhotoLibrary />
				<Apartments />
				<Location />
				<Questions />
				<Contact />
				<Footer />
			{/* </Suspense> */}
		</>
	)
}