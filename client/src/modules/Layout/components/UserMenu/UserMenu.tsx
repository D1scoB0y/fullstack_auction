import { FC, memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import styles from './UserMenu.module.css'
import { useUserContext } from '../../../../context/UserContext'


interface Props {
    isActive: boolean
    close: () => void
}

const UserMenu: FC<Props> = ({
    isActive,
    close,
}) => {
    const { user, logout } = useUserContext()

    useEffect(() => {
        if (isActive) {
            document.body.classList.add('modalOpen')
            return
        }

        document.body.classList.remove('modalOpen')
    }, [isActive])

    return (
        <div className={clsx(styles.overlay, isActive && styles.menuActive)} onClick={close}>
            <div
                className={clsx(styles.menuBody, isActive && styles.active)}
                onClick={e => e.stopPropagation()}
            >
                <div className={styles.menuHeader}>
                    <div className={styles.authBox}>
                        <img className={styles.userIcon} src="/user_icon.png" alt="user icon" />
                        <span className={styles.username}>{user?.username}</span>
                    </div>
                    <div className={styles.crossIconContainer} onClick={close}>
                        <img
                            className={styles.crossIcon}
                            src="/cancel.png"
                            alt="cross icon"
                        />
                    </div>
                </div>
                <div className={styles.menuContent}>
                    {user?.isSeller && (
                        <Link
                            to='/lots'
                            className={styles.menuOption}
                            onClick={() => {
                                close()
                            }}
                        >
                            Лоты
                        </Link>
                    )}

                    {user?.isSeller && (
                        <Link
                            to='/ended-lots'
                            className={styles.menuOption}
                            onClick={() => {
                                close()
                            }}
                        >
                            Завершенные лоты
                        </Link>
                    )}

                    <Link
                        to='/bids'
                        className={styles.menuOption}
                        onClick={() => {
                            close()
                        }}
                    >
                        Ставки
                    </Link>

                    <Link
                        to="/settings"
                        className={styles.menuOption}
                        onClick={() => {
                            close()
                        }}
                    >
                        Аккаунт
                    </Link>

                    <Link
                        to="/"
                        className={styles.exitOption}
                        onClick={() => {
                            logout()
                            close()
                        }}
                    >
                        Выйти
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default memo(UserMenu)
