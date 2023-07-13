import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Not_found from './http-response-status-pages/not_found';
import { StrictMode } from 'react';
import GoogleMaps from './components/google-maps';
import Index from './pages/index';

function App() {
	return (
		<GoogleMaps>
			<StrictMode>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Index />} />
						<Route path='*' element={<Not_found />} />
					</Routes>
				</BrowserRouter>
			</StrictMode>
		</GoogleMaps>
	);
}

export default App
