import { useState } from 'react'

import styles from './Header.module.css'
import useAuthStore from '@/store/AuthStore'
import Link from 'next/link'
import LoginModal from '../Modals/LoginModal'
import RegistrationModal from '../Modals/RegistrationModal'


const Header = () => {

	const isAuthenticated = useAuthStore(state => state.isAuthenticated)
	const username = useAuthStore(state => state.user?.username)

	const [loginFormActive, setLoginFormActive] = useState<boolean>(false)
	const [registerFormActive, setRegisterFormActive] = useState<boolean>(false)

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
					{isAuthenticated ? (
						<>
							<div className={styles.userBox}>
								<img className={styles.userIcon} src="/user_icon.png" alt="user icon" />
								<span className={styles.username}>{username}</span>
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
