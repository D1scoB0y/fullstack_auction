import React from "react"
import ReactDOM from 'react-dom/client'
import App from "./App"
import { BrowserRouter } from "react-router-dom"

import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './context/UserContext';
import { GoogleOAuthProvider } from "@react-oauth/google";


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>

		<BrowserRouter>

			<HelmetProvider>
				<UserProvider>
					<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>

						<App />

					</GoogleOAuthProvider>
				</UserProvider>
			</HelmetProvider>

		</BrowserRouter>
	</React.StrictMode>
)
