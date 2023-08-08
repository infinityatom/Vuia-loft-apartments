import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react';

import Index from './pages/index';
import Not_found from './http-response-status-pages/not_found';

function App() {
	return (
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Index />} />
					<Route path='*' element={<Not_found />} />
				</Routes>
			</BrowserRouter>
		</StrictMode>
	);
}

export default App
