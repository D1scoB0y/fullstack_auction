import { useState } from 'react'

import styles from './Header.module.css'

import useModalsStore from '@/stores/modalsStore'

import RegistrationModal from '../../Modals/Auth/RegistrationModal'
import CompanyName from './CompanyName/CompanyName'
import LoginModal from '@/components/Modals/Auth/LoginModal'
import useUserContext from '@/context/useUserContext'
import ResetPasswordModal from '@/components/Modals/Warnings/ResetPasswordModal'
import UserMenu from './UserMenu/UserMenu'




const Header = () => {

	const { user } = useUserContext()

	const {
		setLoginModalActive,
	} = useModalsStore()

	const [userMenuActive, setUserMenuActive] = useState(false)

	return (
		<header className={styles.header}>
			<div className={styles.innerHeader}>

				<CompanyName />

				{user ? (
					<div
						className={styles.authBox}
						onClick={() => setUserMenuActive(true)}
					>

						<img
							className={styles.userIcon}
							src='/user_icon.png'
							alt="burger menu"
						/>

						<span className={styles.username}>{user?.username}</span>

					</div>
				) : (
					<div className={styles.loginButton} onClick={() => setLoginModalActive(true)}>Войти</div>
				)}


			</div>

				

			<UserMenu isActive={userMenuActive} close={() => setUserMenuActive(false)} />
			<LoginModal />
			<RegistrationModal />
			<ResetPasswordModal />

		</header>
	)
}

export default Header
