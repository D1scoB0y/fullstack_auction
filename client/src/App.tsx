import { FC } from 'react';
import LandingPage from './components/LandingPage/LandingPage'
import { Routes, Route, Navigate } from "react-router-dom";
import './styles/globals.css'
import SettingsPage from './components/SettingsPage/SettingsPage';
import Layout from './components/Layout/Layout';
import useAuthStore from './stores/authStore';


const Protected: FC<{children: React.ReactNode}> = ({children}) => {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated)

	if (!isAuthenticated) {
		return <Navigate to='/404'/>
	}

	return children
}


const App = () => {
  return (
    <Routes>
		<Route path='/' element={<Layout />}>
			<Route path='/' element={<LandingPage />} />
			<Route path='/settings' element={<Protected children={<SettingsPage />} />} />
			<Route path='/404' element={<>404 not found</>} />
			<Route path='*' element={<Navigate to='/404' />}/>
		</Route>
	</Routes>
  )
}


export default App
