import { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'

import CompanyName from '../../../../UI/CompanyName/CompanyName'
import UserMenu from '../UserMenu/UserMenu'
import { useUserContext } from '../../../../context/UserContext'
import clsx from 'clsx'


const Header = () => {
    const { user } = useUserContext()
    const [userMenuActive, setUserMenuActive] = useState(false)

    return (
        <header className={styles.header}>
            <div className={styles.innerHeader}>
                <CompanyName />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link
                        className={styles.howItWorksHref}
                        to="/how-it-works"
                    >
                        <img
                            src="/question.png"
                            alt="question mark"
                            className={styles.howItWorks}
                        />
                    </Link>

                    <Link
                        className={styles.howItWorksDesctop}
                        to="/how-it-works"
                    >
                        Как это работает?
                    </Link>

                    {user ? (
                        <div
                            className={clsx(styles.authBox, userMenuActive && styles.hide)}
                            onClick={() => setUserMenuActive(true)}
                            
                        >
                            <img className={styles.userIcon} src="/user_icon.png" alt="burger menu" />
                            <span className={styles.username}>{user?.username}</span>
                        </div>
                    ) : (
                        <Link
                            className={styles.loginButton}
                            to="/login"
                        >
                            Войти
                        </Link>
                    )}
                </div>
            </div>

            <UserMenu
                isActive={userMenuActive}
                close={() => setUserMenuActive(false)}
            />
        </header>
    )
}

export default Header
