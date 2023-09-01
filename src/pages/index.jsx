
import { register } from 'swiper/element/bundle';
register();

import Header from '../components/header';

import PhotoLibrary from '../components/photo_library';
import Apartments from '../components/apartments';
import Location from '../components/location';
import Questions from '../components/questions';
import Contact from '../components/contact';
import Footer from '../components/footer';


import '../css/Index.css';


export default function Index() {

	return ( <Content /> )
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