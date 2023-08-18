import { FC } from 'react'

import styles from './MobileUserMenu.module.css'

import { IUser } from '@/types/user.interface'
import { useNavigate } from 'react-router-dom'
import useModalsStore from '@/stores/modalsStore'
import useUserContext from '@/context/useUserContext'


interface IMobileUserMenu {
    token: string|null
    user: IUser|null,
}


const MobileUserMenu: FC<IMobileUserMenu> = ({
    token,
    user,
}) => {

    const {
        setMobileUserMenuActive,
        setLoginModalActive,
        setRegistrationModalActive,
    } = useModalsStore()

    const navigate = useNavigate()

    const { logout } = useUserContext()

    
    return (
        <div className={styles.mobileUserMenu}>

            {(token && user) ? (

                <>

                    {user.is_seller && (
                        <div
                            className={styles.menuSection}
                            onClick={() => {
                                    setMobileUserMenuActive(false)
                                    navigate('/lots')
                            }}
                        >
                            Лоты
                        </div>
                    )}


                    <div
                        className={styles.menuSection}
                        onClick={() => {
                                setMobileUserMenuActive(false)
                                navigate('/settings')
                        }}
                    >
                        Настройки
                    </div>


                    <div
                        className={`${styles.menuSection} ${styles.exitSection}`}
                        onClick={() => {
                                setMobileUserMenuActive(false)
                                logout()
                                navigate('/')
                        }}
                    >
                        Выйти
                    </div>
                </>
            ) : (
                <>

                    <div
                        className={styles.menuSection}
                        onClick={() => {
                                setMobileUserMenuActive(false)
                                setLoginModalActive(true)
                        }}
                    >
                        Вход
                    </div>


                    <div
                        className={`${styles.menuSection} ${styles.exitSection}`}
                        onClick={() => {
                                setMobileUserMenuActive(false)
                                setRegistrationModalActive(true)
                        }}
                    >
                        Регистрация
                    </div>
                </>
            )}
        </div>
    )
}


export default MobileUserMenu
