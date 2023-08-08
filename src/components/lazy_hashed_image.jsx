import { useState, useEffect, useRef } from 'react';
import { Blurhash } from "react-blurhash";

import '../css/LazyHashedImage.css';

const useImageLoaded = () => {
	const [loaded, setLoaded] = useState(false)
	const ref = useRef()

	const onLoad = () => {
		setLoaded(true)
	}

	useEffect(() => {
		if (ref.current && ref.current.complete) {
			onLoad()
		}
	})

	return [ref, loaded, onLoad]
}

export default function LazyHashedImage({ src, hash, className, ...props }) {
	const [ref, loaded, onLoad] = useImageLoaded();

	className = 'LazyHashedImage ' + (className ?? '');

	return (
		<div
			className={className}
			data-loaded={loaded ? 'true' : 'false'}
			{...props}
		>
			<img
				ref={ref}
				onLoad={onLoad}
				src={src}
			/>
			<div className='Blurhash'>
				<Blurhash
					hash={hash}
					width={'100%'}
					height={'100%'}
					resolutionY={4*16}
					resolutionX={3*16}
				/>
			</div>
		</div>
	)
}