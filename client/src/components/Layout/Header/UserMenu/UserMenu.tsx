import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './UserMenu.module.css'


import { IUser } from '@/types/user.interface'
import useUserContext from '@/context/useUserContext'


const UserMenu: FC<{isActive: boolean, user: IUser}> = ({isActive, user}) => {

    const { logout } = useUserContext()

    const navigate = useNavigate()

    return (
        <>
            {isActive && (
                <div className={styles.dropDown}>
                    {(user && user.is_seller) && <Link to={'/'} className={styles.dropDownItem}>Лоты</Link>}

                    <Link to={'/settings'} className={styles.dropDownItem}>Настройки</Link>
                    
                    <div className={`${styles.dropDownItem} ${styles.exitItem}`} onClick={() => {logout(); navigate('/')}}>Выйти</div>
                </div>
            )}
        </>
    )
}


export default UserMenu