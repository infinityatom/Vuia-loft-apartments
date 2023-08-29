import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import SwiperApartmetsStyle from '../css/SwiperApartmets.css?inline';
import styles from '../css/Apartments.module.css';

import DataApartments from '../data/DataApartments.json';

import Spline from '@splinetool/react-spline';

const SplineObjects = [
	'/spline/ap_1_e_12_e_26_e_38_e_50.spline',
	'/spline/ap_2_e_1.spline',
	'/spline/ap_2_a_e_27_e_39.spline',
	'/spline/ap_3_e_2.spline',
	'/spline/ap_3_a_e_28_e_40.spline',
	'/spline/ap_4_e_9.spline',
	'/spline/ap_4_a_e_23_e_35.spline',
	'/spline/ap_4_b_e_47.spline',
	'/spline/ap_5_e_10_e_24_e_36_e_48.spline',
];

// {SplineObjects.map(item =>
// 	<div key={item} style={{
// 		width: '80vw',
// 		height: '80vh',
// 		backgroundColor: 'red',
// 	}}>
// 		<Spline scene={item} />
// 	</div>
// )}

export default function Apartments() {
	const swiperRef = useRef(null);

	useEffect(() => {
		const swiperContainer = swiperRef.current;
		const params = {
			mousewheel: {
				forceToAxis: true,
			},
			scrollbar: {
				draggable: true,
			},
			// centeredSlides: true,
			slidesPerView: 'auto',
			keyboard: true,
			freeMode: {
				enabled: true,
				sticky: false,
			},
			spaceBetween: 20,
			injectStyles: [SwiperApartmetsStyle],
		};

		Object.assign(swiperContainer, params);
		swiperContainer.initialize();
	}, []);

	return (
		<section className={styles.Apartments}>
			<swiper-container init="false" ref={swiperRef}>
				<div slot="container-start" className='containerStart'>
					<div className={styles.floatingDiv}>
						<h1>Apartments</h1>
					</div>
					{/* <span>2 camere</span>
					<span>3 camere</span>
					<span>garsoniera</span> */}
				</div>
				{DataApartments.map((apartment, index) => {
					return (
						<swiper-slide key={apartment.tip_apartament} >
							<Dialog.Root>

								<Dialog.Trigger className={styles.DialogTrigger}>
									<img src={apartment.img} />
									<h4>{apartment.suprafata_utila} mp</h4>
								</Dialog.Trigger>

								<DialogPortal apartment={apartment} index={index} />

							</Dialog.Root>
						</swiper-slide>
					);
				})}
			</swiper-container>
		</section>
	)
}

function DialogPortal({ apartment, index }) {

	return (
		<Dialog.Portal>
			<Dialog.Overlay className={styles.DialogOverlay} />
			<Dialog.Content className={styles.DialogContent}>
				<DialogContentSwiper img={apartment.img} splineURL={SplineObjects[index]} apartment={apartment} />
			</Dialog.Content>
		</Dialog.Portal >
	)
}



function DialogContentSwiper({ img, splineURL, apartment }) {
	return (
		<>
			<Dialog.Close style={{
				width: '50px',
				height: '50px',
				position: 'absolute',
				top: 25,
				right: 30,
				// display: 'grid',
			}}>
				<CloseIcon style={{
					width: '45px',
					height: '45px',
					position: 'absolute',
					top: 2.5,
					right: 2.5,
				}}/>
			</Dialog.Close>
			
			<swiper-container slides-per-view='1' mousewheel-force-to-axis='true' pagination keyboard navigation>
				<swiper-slide>
					<img src={img} />
				</swiper-slide>
				<swiper-slide>
					<Spline scene={splineURL} />
				</swiper-slide>

				<swiper-slide>
					<div className={styles.DialogInfo}>
						<Dialog.Title className={styles.DialogTitle}>{apartment.tip_apartament}</Dialog.Title>
						<span>(Ap: {apartment.nr_aparatament.toString()})</span>
						<ul>
							{apartment.suprafete.map((item, index) =>
								<li key={index}>{item.name} = {item.size}</li>
							)}
						</ul>
						<span>Suprafata Construita {apartment.suprafata_utila} mp</span><br />
						<span>Suprafata Utila {apartment.suprafata_construita} mp</span>
					</div>
				</swiper-slide>
			</swiper-container>
		</>
	);
}