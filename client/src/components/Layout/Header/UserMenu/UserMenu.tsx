import { FC } from 'react'

import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

import styles from './UserMenu.module.css'
import useUserContext from "@/context/useUserContext"


interface IUserMenuProps {
    isActive: boolean
    close: () => void
}

const UserMenu: FC<IUserMenuProps> = ({
    isActive,
    close,
}) => {

    const { user, logout } = useUserContext()
    
    const navigate = useNavigate()

    return (

        <div className={clsx(styles.overlay, isActive && styles.menuActive)} onClick={close}>

            <div
                className={clsx(styles.menuBody, isActive && styles.active)}
                onClick={e => e.stopPropagation()}
            >

                <div className={styles.menuHeader}>

                    <div className={styles.authBox}>

                        <img
                            className={styles.userIcon}
                            src="/user_icon.png"
                            alt="user icon"
                        />
                        
                        <span className={styles.username}>{user?.username}</span>

                    </div>

                    <div className={styles.crossIconContainer}>
                        <img
                            className={styles.crossIcon}
                            onClick={close}
                            src="/cancel.png"
                            alt="cross icon"
                        />
                    </div>

                </div>


                <div className={styles.menuContent}>
                    
                    {user?.isSeller && (
                        <div className={styles.menuOption} onClick={() => {navigate('/lots'); close()}}>
                            Лоты
                        </div>
                    )}

                    <div className={styles.menuOption}>
                        Ставки
                    </div>
                    

                    <div className={styles.menuOption} onClick={() => {navigate('/settings'); close()}}>
                        Настройки
                    </div>

                    <div className={styles.exitOption} onClick={() => {logout(); close()}}>
                        Выйти
                    </div>

                </div>

            </div>
        </div>
    )
}


export default UserMenu
