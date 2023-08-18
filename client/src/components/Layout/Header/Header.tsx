import { useState } from 'react'

import styles from './Header.module.css'

import useModalsStore from '@/stores/modalsStore'

import RegistrationModal from '../../Modals/Auth/RegistrationModal'
import CompanyName from './CompanyName/CompanyName'
import LoginModal from '@/components/Modals/Auth/LoginModal'
import UserMenu from './UserMenu/UserMenu'
import useUserContext from '@/context/useUserContext'
import ResetPasswordModal from '@/components/Modals/Warnings/ResetPasswordModal'
import MobileUserMenu from './MobileUserMenu/MobileUserMenu'


const Header = () => {
	const [showUserMenu, setShowUserMenu] = useState<boolean>(false)

	const { token, user } = useUserContext()

	const {
		mobileUserMenuActive,
		setMobileUserMenuActive,
		setLoginModalActive,
		setRegistrationModalActive,
	} = useModalsStore()

	return (
		<header className={styles.header}>
			<div className={styles.innerHeader}>

				<CompanyName />

				<div className={styles.authBox}>

					{(token && user) ? (
						<>
							<div className={styles.userBox} onMouseLeave={() => setShowUserMenu(false)} onMouseEnter={() => setShowUserMenu(true)}>
								<img className={styles.userIcon} src="/user_icon.png" alt="user icon" />
								<span className={styles.username}>{user.username}</span>
								<UserMenu isActive={showUserMenu} user={user} />
							</div>
						</>
					) : (
						<>
							<span
								className={styles.registrationHref}
								onClick={() => setRegistrationModalActive(true)}
							>
								Регистрация
							</span>
							<div
								className={styles.loginHref}
								onClick={() => setLoginModalActive(true)}
							>
								Войти
							</div>
						</>
					)}
				</div>
				
				<img
					className={styles.burgerMenu}
					src={mobileUserMenuActive ? '/cancel.png' : '/burger_menu.png'}
					onClick={() => setMobileUserMenuActive(!mobileUserMenuActive)}
					alt="burger menu"
				/>

			</div>
			
			{mobileUserMenuActive && <MobileUserMenu token={token} user={user} />}

			<LoginModal />
			<RegistrationModal />
			<ResetPasswordModal />

		</header>
	)
}

export default Header
