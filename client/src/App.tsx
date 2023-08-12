import { FC } from 'react';

import { Routes, Route, Navigate } from "react-router-dom";

import './styles/globals.css'

import { UserProvider } from './context/UserContext';

import useUserContext from './context/useUserContext';

import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage'
import SettingsPage from './pages/SettingsPage/SettingsPage';
import EmailVerificationPage from './pages/EmailVerificationPage/EmailVerificationPage';


const Protected: FC<{children: React.ReactNode}> = ({children}) => {

	const { token } = useUserContext()

	if (!token) {
		return <Navigate to='/404'/>
	}

	return children
}


const App = () => {
  return (
	<UserProvider>
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<LandingPage />} />
				<Route path='/settings' element={<Protected children={<SettingsPage />} />} />
				<Route path='/email-verification' element={<EmailVerificationPage />} />
				<Route path='/404' element={<>404 not found</>} />
				<Route path='*' element={<Navigate to='/404' />}/>
			</Route>
		</Routes>
	</UserProvider>
  )
}


export default App
