import Rive from '@rive-app/react-canvas';
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef } from 'react';

import imgBG from '../assets/images/Fronalpstock_big.jpg';
import imgBuilding from '../assets/images/buildin_img.png';
import riveSrc from '../assets/riv/vuia-loft-apartments-logo.riv?url';

import style from '../css/Header.module.css';

import LazyHashedImage from './lazy_hashed_image';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export default function Header() {
	const hash = 'LYA-^@ofR.bb.Af8R+a#tlR+WBf5';

	const headerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: headerRef,
		offset: ['start start', 'end start']
	});
	// const { scrollY } = useScroll();

	let buildingY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
	let logoY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

	const { rive, RiveComponent } = useRive({
		src: './riv/vuia-loft-apartments-logo.riv',
		stateMachines: 'state',
		autoplay: true,
	}, );
	
	const loading = useStateMachineInput(rive, 'state', 'loading', true);
	useEffect(() => {
		loading && (loading.value = false);
	}, [loading]);

	return (
		<section
			className={style.Header}
			ref={headerRef}
		>
			{/* <LazyHashedImage src='https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg' hash={hash} /> */}
			<motion.img
				className={style.imgBG}
				src={imgBG}
				// style={{
				// }}
			/>
			<motion.div
				className={style.Logo}
				style={{ y: logoY }}
			>
				<RiveComponent
					// src={riveSrc}
					// artboard={'logo'}
					// stateMachines={'state'}
					// autoPlay={true}
				/>
			</motion.div>
			<motion.img
				className={style.imgBuilding}
				src={imgBuilding}
				style={{
					x: '-50%',
					y: buildingY,
				}}
			/>
		</section>
	)
}