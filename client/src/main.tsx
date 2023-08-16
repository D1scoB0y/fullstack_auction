import React from "react"
import ReactDOM from 'react-dom/client'
import App from "./App"
import { BrowserRouter } from "react-router-dom"

import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './context/UserContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>

			<UserProvider>

				<BrowserRouter>
					<App />
				</BrowserRouter>

			</UserProvider>

		</HelmetProvider>
	</React.StrictMode>
)
