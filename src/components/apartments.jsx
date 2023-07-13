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
		<>
			<h1>Apartments</h1>
			<swiper-container
				slides-per-view='3'
				mousewheel-force-to-axis
				keyboard
				scrollbar
				free-mode
				centered-slides
				style={{
					width: '50vw',
					height: '50vh',
					backgroundColor: 'green'
				}}
			>
				{DataApartments.map(apartment => {
					return (
						<swiper-slide
							key={apartment.tip_apartament}
							style={{
								// height: '100%',
								backgroundColor: 'red',
							}}
						>
							<Dialog.Root>
								<Dialog.Trigger
									style={{
										width: '100%',
										// height: '100%',
										padding: '0'
									}}
								>
									<img src={apartment.imgs[0]}
										style={{
											objectFit: 'cover',
											width: '100%',
											height: '100%'
										}}
									/>
									<p>{apartment.suprafata_utila}</p>
								</Dialog.Trigger>
								<Dialog.Portal>
									<Dialog.Overlay />
									<Dialog.Content>
										<swiper-container
											slides-per-view='1'
											mousewheel-force-to-axis='true'
											pagination
											keyboard
											loop
											style={{
												width: '200px',
												height: '200px',
												backgroundColor: 'green'
											}}
										>
											{apartment.imgs.map(img =>
												<swiper-slide key={img}>
													<img src={img}
														style={{
															width: '100%',
															height: '100%'
														}}
													/>
												</swiper-slide>
											)}
										</swiper-container>
										<Dialog.Title>{apartment.tip_apartament}</Dialog.Title>
										<Dialog.Description asChild>
											<ul>
												<li>etaj_disponibilitate: {apartment.etaj_disponibilitate}</li>
												<li>suprafata_utila: {apartment.suprafata_utila}</li>
												<li>suprafata_construita: {apartment.suprafata_construita}</li>
												<li>pret_imobil: {apartment.pret_imobil}</li>
												<li>pret_pe_mp: {apartment.pret_pe_mp}</li>
												<li>domitor_1_mp: {apartment.domitor_1_mp}</li>
												<li>domitor_2_mp: {apartment.domitor_2_mp}</li>
												<li>baie_1_mp: {apartment.baie_1_mp}</li>
												<li>baie_2_mp: {apartment.baie_2_mp}</li>
												<li>terasa_mp: {apartment.terasa_mp}</li>
												<li>hol_mp: {apartment.hol_mp}</li>
											</ul>
										</Dialog.Description>
										<Dialog.Close aria-label='Close'><Cross2Icon /></Dialog.Close>
									</Dialog.Content>
								</Dialog.Portal>
							</Dialog.Root>
						</swiper-slide>
					);
				})}
			</swiper-container>
		</>
	)
}