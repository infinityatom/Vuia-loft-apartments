import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SchoolIcon from '@mui/icons-material/School';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useRive } from '@rive-app/react-canvas';
import { Wrapper } from "@googlemaps/react-wrapper";
import { AnimatePresence, motion } from "framer-motion"


import styles from '../css/Map.module.css';

export default function Location() {
	return (
		<section className={styles.Location}>
			<Wrapper
				apiKey='AIzaSyCbqSpfA-G06euQfJ7O0XAvMkAjMhhVFTc'
				libraries={['marker']}
				version='beta'
			>
				<Helper />
			</Wrapper>
		</section>
	);
}

function Helper() {
	const [map, setMap] = useState();
	const [hover, setHover] = useState(false);
	const [expand, setExpand] = useState(false);
	const mapRef = useRef();

	const [showCard, setShowCard] = useState(false);

	function toggleCard() {
		setShowCard(current => !current);
	}

	useEffect(() => { (showCard || hover) ? setExpand(true) : setExpand(false) }, [hover, showCard]);

	useEffect(() => {
		const mapOptions = {
			mapId: '96f8fdb2ec345fb8',
			zoom: 15,
			center: { lat: 47.65478997650616, lng: 26.2596111365463 },
			// disableDefaultUI: true,
			mapTypeControl: false,
		}

		setMap(new window.google.maps.Map(mapRef.current, mapOptions));
	}, []);


	useEffect(() => {
		if (!map) return;

		function mapClick() { if (showCard) setShowCard(false) }

		map.addListener('click', mapClick);

	}, [map, showCard]);

	return (
		<>
			<div
				className={styles.Map}
				ref={mapRef}
				style={{ height: '100%' }}
			/>
			<AnimatePresence>
				{showCard && <Card exitCard={() => setShowCard(false)} />}
			</AnimatePresence>
			{map && <>
				<Marker
					map={map}
					onClick={toggleCard}
				>
					<div
						onMouseOver={() => { setHover(true) }}
						onMouseOut={() => { setHover(false) }}
						className={styles.Marker}
					>
						<MapPin
							className={styles.MapPin}
							startAnimating={true}
						/>
					</div>
				</Marker>
				<Route
					map={map}
					from={{ lat: 47.655591716041435, lng: 26.259293253698644 }}
					to={{ lat: 47.65895281884961, lng: 26.27049008153655 }}
					expand={expand}
				/>
				<Route
					map={map}
					from={{ lat: 47.655591716041435, lng: 26.259293253698644 }}
					to={{ lat: 47.645351895895026, lng: 26.256903706605552 }}
					expand={expand}
				/>
				<Route
					map={map}
					from={{ lat: 47.655591716041435, lng: 26.259293253698644 }}
					to={{ lat: 47.6541763436878, lng: 26.25925725269097 }}
					expand={expand}
				/>
			</>}
		</>
	);
}

function MapPin({ startAnimating, ...props }) {

	const { rive, RiveComponent } = useRive({
		src: './riv/vuia-loft-apartments.riv',
		artboard: 'map_pin',
		stateMachines: 'State',
		autoplay: false,
	},);

	useEffect(() => {
		if (rive && startAnimating) rive.play();
	}, [rive, startAnimating]);

	return (
		<RiveComponent {...props} />
	)
}







function Route({ map, from, to, expand }) {
	const animationLoop = useRef(null);
	const route = useRef(null);
	const line = useRef(null);
	const index = useRef(0);
	const animatedRoute = useRef([]);

	useEffect(() => {
		if (route.current == null || line.current == null) { return }

		if (animationLoop.current) { clearInterval(animationLoop.current) }

		animationLoop.current = setInterval(function () {
			if (expand && index.current < route.current.length) {
				animatedRoute.current.push(route.current[index.current]);
				index.current++;

				line.current.setPath(animatedRoute.current);
			} else if (!expand && index.current > 0) {
				animatedRoute.current.pop();
				index.current--;

				line.current.setPath(animatedRoute.current);
			} else {
				clearInterval(animationLoop.current);
				animationLoop.current = null;
			}
		}, 30);

		return () => {
			clearInterval(animationLoop.current);
			animationLoop.current = null;
		};

	}, [map, expand]);

	useEffect(() => {
		const service = new window.google.maps.DirectionsService();
		line.current = new window.google.maps.Polyline({
			path: [],
			strokeColor: "#6D88B6",
			strokeOpacity: 1,
			strokeWeight: 5,
			geodesic: true,
			map: map,
		});

		service.route({
			origin: from,
			destination: to,
			travelMode: window.google.maps.TravelMode.WALKING,
		}, (result, status) => {
			if (status === 'OK' && result) {
				route.current = result.routes[0].overview_path.map((path) => ({
					lat: path.lat(),
					lng: path.lng()
				}));
				index.current = 0;
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);
}

function Card({ exitCard }) {
	return (
		<motion.div
			className={styles.Card}
			initial={{ x: -1000 }}
			animate={{ x: 0 }}
			exit={{ x: -1000 }}
		>
			<h3>Locatie</h3>
			<button
				type="button"
				onClick={exitCard}
			>
				<CloseIcon className={styles.Icon} />
			</button>
			<p><PlaceIcon className={styles.Icon} /><span><a href="https://goo.gl/maps/cofCHmEKPw84YJfN6">loc. Suceava, Strada Traian Vuia</a></span></p>
			<p>
				{/* <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio autem eos, sint nam exercitationem dolor et inventore suscipit accusamus, quae modi recusandae excepturi ipsam at.</span> */}
				{/* <span>Locatia este in apropiere de tot</span> */}
			</p>
			<p><DirectionsBusIcon className={styles.Icon} /><span>Centru Suceava - 5 min</span></p>
			<p><SchoolIcon className={styles.Icon} /><span>Technical College Petru Muşat - 1 min</span></p>
			<p><ShoppingCartOutlinedIcon className={styles.Icon} /><span>Iulius mall - 5 min</span></p>
		</motion.div>
	);
}

function Marker({ map, children, onClick }) {
	const markerRef = useRef(null);
	const rootRef = useRef(null);
	// const infoRef = useRef(null);
	// const infoRoot = useRef(null);

	useEffect(() => {
		if (markerRef.current) return;

		const container = document.createElement('div');
		rootRef.current = createRoot(container);
		rootRef.current.render(children);

		markerRef.current = new window.google.maps.marker.AdvancedMarkerView({
			map: map,
			position: { lat: 47.65478997650616, lng: 26.2596111365463 },
			content: container,
		});

		window.google.maps.event.addListener(markerRef.current, 'click', clicked);

		// const containerInfo = document.createElement('div');
		// infoRoot.current = createRoot(containerInfo);
		// infoRoot.current.render(infoWindow);

		// infoRef.current = new window.google.maps.InfoWindow({
		// 	content: containerInfo,
		// 	ariaLabel: "Uluru",
		// 	maxWidth: 600,
		// 	minWidth: 300,
		// });

		return () => {
			// window.google.maps.event.removeListener(markerRef.current, 'click', clicked);
			// markerRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);


	function clicked(event) {
		onClick(event);

		// infoRef.current.open({
		// 	anchor: markerRef.current,
		// 	map,
		// });
	}
}