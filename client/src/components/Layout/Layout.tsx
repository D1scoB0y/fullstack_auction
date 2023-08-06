import { FC, ReactNode } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
  	return (
		<>
			<Header />
			
			<main>
				<Outlet />
			</main>

			<Footer />
		</>
)
}

export default Layout
