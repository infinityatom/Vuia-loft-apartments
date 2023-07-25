import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import DataApartments from '../data/DataApartments.json';
import { useEffect, useRef } from 'react';

import '../css/Apartments.css';
import '../css/ApartmentsDialog.css';
import SwiperApartmetsStyle from '../css/SwiperApartmets.css?inline';

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
			centeredSlides: true,
			slidesPerView: 3,
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
		<section className='Apartments'>
			<h1>Apartments</h1>
			<swiper-container init="false" ref={swiperRef}>
				<div slot="container-start" className='container-start'>
					<span>2 camere</span>
					<span>3 camere</span>
					<span>garsoniera</span>
				</div>
				{DataApartments.map(apartment => {
					return (
						<swiper-slide key={apartment.tip_apartament} >
							<Dialog.Root>

								<Dialog.Trigger className='DialogTrigger'>
									<img src={apartment.imgs[0]} />
									<h4>{apartment.suprafata_utila} mp</h4>
								</Dialog.Trigger>

								<DialogPortal apartment={apartment} />

							</Dialog.Root>
						</swiper-slide>
					);
				})}
			</swiper-container>
		</section>
	)
}

function DialogPortal({ apartment }) {
	return (
		<Dialog.Portal>
			<Dialog.Overlay className='DialogOverlay' />
			<Dialog.Content className='DialogContent'>
				<DialogContentSwiper imgs={apartment.imgs} />
				<Dialog.Title className='DialogTitle'>{apartment.tip_apartament}</Dialog.Title>
				<Dialog.Description className='DialogDescription' asChild>
					<ul>
						<li>Etaj disponibilitate: {apartment.etaj_disponibilitate}</li>
						<li>Suprafata utila: {apartment.suprafata_utila}</li>
						<li>Suprafata construita: {apartment.suprafata_construita}</li>
						<li>Pret imobil: {apartment.pret_imobil}</li>
						<li>Pret pe mp: {apartment.pret_pe_mp}</li>
						<li>Domitor 1 mp: {apartment.domitor_1_mp}</li>
						<li>Domitor 2 mp: {apartment.domitor_2_mp}</li>
						<li>Baie 1 mp: {apartment.baie_1_mp}</li>
						<li>Baie 2 mp: {apartment.baie_2_mp}</li>
						<li>Terasa mp: {apartment.terasa_mp}</li>
						<li>Hol mp: {apartment.hol_mp}</li>
					</ul>
				</Dialog.Description>
				<Dialog.Close className='DialogClose' aria-label='Close'><Cross2Icon /></Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	)
}

function DialogContentSwiper({ imgs }) {
	return (
		<swiper-container slides-per-view='1' mousewheel-force-to-axis='true' pagination keyboard loop >
			{imgs.map(img =>
				<swiper-slide key={img}>
					<img src={img} />
				</swiper-slide>
			)}
		</swiper-container>
	);
}