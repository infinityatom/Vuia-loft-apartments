
import { useState, Suspense, lazy } from 'react';
import Intro from '../pages/intro';

// email api key
// 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
// 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

const Header = lazy(() => import('../components/header'));
const PhotoLibrary = lazy(() => import('../components/photo_library'));
const Apartments = lazy(() => import('../components/apartments'));
const Location = lazy(() => import('../components/location'));
const Questions = lazy(() => import('../components/questions'));
const About = lazy(() => import('../components/about'));
const Contact = lazy(() => import('../components/contact'));
const Footer = lazy(() => import('../components/footer'));

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

import '../css/Index.css';


export default function Index() {
	const [introLoaded, setIntroLoaded] = useState(false);

	return (
		<>
			<Intro onLoaded={() => {
				setIntroLoaded(true)
			}} />
			{introLoaded ? <Content /> : null}

		</>
	)
}

function Content() {
	return (
		<Suspense>
			<Header />
			<PhotoLibrary />
			<Apartments />
			<Location />
			<Questions />
			<About />
			<Contact />
			<Footer />
		</Suspense>
	)
}