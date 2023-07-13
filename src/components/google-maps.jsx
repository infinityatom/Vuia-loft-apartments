
import { useState, createContext } from 'react';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';

// googleMapsApiKey: 'AIzaSyAZd1iJMQDbS12rrFAF9YzomhAjQP5BZOE', // api key for the web
// googleMapsApiKey: 'AIzaSyCbqSpfA-G06euQfJ7O0XAvMkAjMhhVFTc', // api key for testing

const GoogleMapsOptions = {
	zoom: 15,
	center: {
		lat: 47.65478997650616,
		lng: 26.2596111365463,
	},
	mapId: '96f8fdb2ec345fb8'
}

export const GoogleMapsContext = createContext(null);

export default function GoogleMaps({ children, ...props}) {

	const [mapContainer, setMapContainer] = useState(null);

	return (
		<GoogleMapsProvider
			googleMapsAPIKey={'AIzaSyCbqSpfA-G06euQfJ7O0XAvMkAjMhhVFTc'}
			mapContainer={mapContainer}
			mapOptions={GoogleMapsOptions}
			{...props}
		>
			<GoogleMapsContext.Provider value={{setMapContainer: setMapContainer}}>
				{children}
			</GoogleMapsContext.Provider>
		</GoogleMapsProvider>
	)
}