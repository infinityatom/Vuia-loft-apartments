import { useEffect, useRef } from 'react';

export default function useHorizontalDrag(speed) {
	const containerRef = useRef(null);
	const multiplier = speed ?? 1;
	const dragged = useRef(false);
	const delta = 6;

	useEffect(() => {
		var mouseDownAt = 0;
		var initialScrollLeft = 0;

		function onDrag(event) {
			containerRef.current.scrollLeft = initialScrollLeft + (mouseDownAt - event.clientX) * multiplier;

			const diffX = Math.abs(mouseDownAt - event.clientX);
			if (diffX > delta) {
				dragged.current = true;
			}
		}

		function dragHandler(event) {
			initialScrollLeft = containerRef.current.scrollLeft;
			mouseDownAt = event.clientX;

			dragged.current = false;
			window.addEventListener('pointermove', onDrag);
			window.addEventListener('pointerup', () => {
				window.removeEventListener('pointermove', onDrag);
			}, { once: true });
		}

		containerRef.current.onpointerdown = dragHandler;

	}, [multiplier]);

	return { containerRef, dragged };
}