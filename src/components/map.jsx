import { useCallback, useContext } from 'react';

import { GoogleMapsContext } from './google-maps';

export default function Map() {
	const { setMapContainer } = useContext(GoogleMapsContext);

	const mapRef = useCallback(node => {
		node && setMapContainer(node);
	}, [setMapContainer]);

	return (
		<div id="container">
			hello
			<div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />
		</div>
	);
}