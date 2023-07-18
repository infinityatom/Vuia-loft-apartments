import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import DataApartments from '../data/DataApartments.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';
import 'swiper/css/mousewheel';
import 'swiper/css/free-mode';

import '../css/Apartments.css';

export default function Apartments() {

	return (
		<section className='Apartments'>
			<h1>Apartments</h1>
			<swiper-container mousewheel-force-to-axis keyboard scrollbar free-mode centered-slides slides-per-view='3' >
				{DataApartments.map(apartment => {
					return (
						<swiper-slide key={apartment.tip_apartament} >
							<Dialog.Root>

								<Dialog.Trigger className='DialogTrigger'>
									<img src={apartment.imgs[0]} />
									<p>{apartment.suprafata_utila} mp</p>
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
			{/* <Dialog.Overlay /> */}
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