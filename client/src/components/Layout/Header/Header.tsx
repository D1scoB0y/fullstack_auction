import { useState } from 'react'

import styles from './Header.module.css'
import useAuthStore from '@/stores/AuthStore'
import Link from 'next/link'
import LoginModal from '@/components/Modals/LoginModal'
import RegistrationModal from '@/components/Modals/RegistrationModal'
import useUser from '@/stores/useUser'
import useStore from '@/stores/useStore'
import UserMenu from './UserMenu/UserMenu'


const Header = () => {
	const [loginFormActive, setLoginFormActive] = useState<boolean>(false)
	const [registerFormActive, setRegisterFormActive] = useState<boolean>(false)

	const [menuActive, setMenuActive] = useState<boolean>(false)

	const isAuthenticated = useStore(useAuthStore, state => state.isAuthenticated)
	const user = useUser()
	
	return (
		<div className={styles.header}>
			<div className={styles.innerHeader}>

				<Link href={'/'}>
					<div className={styles.companyNameBox}>
						<h1 className={styles.companyName}>FotoJäger`s</h1>
						<span className={styles.auctionsWord}>AUCTIONS</span>
					</div>
				</Link>

				<div className={styles.authBox}>
					{(isAuthenticated && user) ? (
						<>
							<div className={styles.userBox} onMouseLeave={() => setMenuActive(false)} onMouseEnter={() => setMenuActive(true)}>
								<img className={styles.userIcon} src="/user_icon.png" alt="user icon" />
								<span className={styles.username}>{user.username}</span>
								<UserMenu isActive={menuActive} user={user} />
							</div>
						</>
					) : (
						<>
							<span
								className={styles.registrationHref}
								onClick={() => {setRegisterFormActive(true)}}
							>
								Регистрация
							</span>
							<div
								className={styles.loginHref}
								onClick={() => setLoginFormActive(true)}
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
