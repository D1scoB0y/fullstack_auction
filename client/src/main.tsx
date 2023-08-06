import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/LandingPage/LandingPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/globals.css'
import SettingsPage from './components/SettingsPage/SettingsPage';
import Layout from './components/Layout/Layout';


const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
			},
			{
				path: "/settings",
				element: <SettingsPage />,
			}
		]
	},
	
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
