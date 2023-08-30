import { FC } from 'react';
import { Routes, Route } from "react-router-dom";

import './styles/globals.css'

import useUserContext from './context/useUserContext';

import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage'
import SettingsPage from './pages/SettingsPage/SettingsPage';
import EmailVerificationPage from './pages/EmailVerificationPage/EmailVerificationPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import CreateLotPage from './pages/CreateLotPage/CreateLotPage';


const Protected: FC<{children: JSX.Element}> = ({
	children,
}) => {

	const { token } = useUserContext()

	return token ? children : <>404 not found</>
}

const OnlyForSeller: FC<{children: JSX.Element}> = ({
	children,
}) => {

	const { user } = useUserContext()

	return user?.isSeller ? children : <>404 not found</>
}


const App = () => {

	return (
		<>
			<Routes>

				<Route path='/' element={<Layout />}>

					<Route path='/' element={<LandingPage />} />
					<Route path='/settings' element={<Protected children={<SettingsPage />} />} />
					<Route path='/create-lot' element={<OnlyForSeller children={<CreateLotPage />} />} />
					<Route path='/email-verification' element={<Protected children={<EmailVerificationPage />} />} /> 
					<Route path='/reset-password' element={<ResetPasswordPage />} /> 
					<Route path='/404' element={<>404 not found</>} />
					<Route path='*' element={<>404 not found</>}/>

				</Route>

			</Routes>
		</>
	)
}


export default App
