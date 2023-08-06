import { useState } from 'react'

import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import LoginModal from '../../Modals/LoginModal'
import useAuthStore from '../../../stores/authStore'
import useUser from '../../../stores/useUser'
import UserMenu from './UserMenu/UserMenu'
import RegistrationModal from '../../Modals/RegistrationModal'


const Header = () => {
	const [loginFormActive, setLoginFormActive] = useState<boolean>(false)
	const [registerFormActive, setRegisterFormActive] = useState<boolean>(false)

	const [showUserMenu, setShowUserMenu] = useState<boolean>(false)

	const isAuthenticated = useAuthStore(state => state.isAuthenticated)
	const user = useUser()
	
	return (
		<div className={styles.header}>
			<div className={styles.innerHeader}>

				<Link to={'/'}>
					<div className={styles.companyNameBox}>
						<h1 className={styles.companyName}>FotoJäger`s</h1>
						<span className={styles.auctionsWord}>AUCTIONS</span>
					</div>
				</Link>

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
								onClick={() => {setRegisterFormActive(true); console.log(registerFormActive)}}
							>
								Регистрация
							</span>
							<div
								className={styles.loginHref}
								onClick={() => {setLoginFormActive(true); console.log(registerFormActive)}}
							>
								Войти
							</div>
						</>
					)}
				</div>

			</div>
			<LoginModal isActive={loginFormActive} setIsActive={setLoginFormActive} setRegistrationFormActive={setRegisterFormActive} />
			<RegistrationModal isActive={registerFormActive} setIsActive={setRegisterFormActive} setLoginFormActive={setLoginFormActive} />
		</div>
	)
}

export default Header
