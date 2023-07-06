import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'

import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Not_found from './http-response-status-pages/not_found.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='*' element={<Not_found />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
