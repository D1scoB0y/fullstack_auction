import { useState } from 'react'

import styles from './Header.module.css'

import useModalsStore from '@/stores/modalsStore'
import useAuthStore from '@/stores/authStore'
import useUser from '@/stores/useUser'

import RegistrationModal from '../../Modals/Auth/RegistrationModal'
import CompanyName from './CompanyName/CompanyName'
import LoginModal from '@/components/Modals/Auth/LoginModal'
import UserMenu from './UserMenu/UserMenu'


const Header = () => {
	const [showUserMenu, setShowUserMenu] = useState<boolean>(false)

	const isAuthenticated = useAuthStore(state => state.isAuthenticated)
	const user = useUser()

	const {
		setLoginModalActive,
		setRegistrationModalActive
	} = useModalsStore()

	return (
		<div className={styles.header}>
			<div className={styles.innerHeader}>

				<CompanyName />

				<div className={styles.authBox}>
					{(isAuthenticated && user) ? (
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

			</div>
			
			<LoginModal />
			<RegistrationModal />
				
		</div>
	)
}

export default Header
