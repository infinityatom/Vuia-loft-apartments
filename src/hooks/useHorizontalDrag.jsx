import { useEffect, useRef } from 'react';

export default function useHorizontalDrag(speed) {
	const containerRef = useRef(null);
	const multiplier = speed ?? 1;
	
	useEffect(() => {
		var mouseDownAt = 0;
		var initialScrollLeft = 0;
	
		function onDrag(event) {
			containerRef.current.scrollLeft = initialScrollLeft + (mouseDownAt - event.clientX) * multiplier;
		}

		function dragHandler(event) {
			initialScrollLeft = containerRef.current.scrollLeft;
			mouseDownAt = event.clientX;
	
			window.addEventListener('pointermove', onDrag);
			window.addEventListener('pointerup', () => {
				window.removeEventListener('pointermove', onDrag);
			}, { once: true });
		}

		containerRef.current.onpointerdown = dragHandler;

	}, [multiplier]);

	return containerRef;
}