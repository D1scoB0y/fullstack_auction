import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './UserMenu.module.css'

import useAuthStore from '@/stores/authStore'

import { IUser } from '@/types/user.interface'


const UserMenu: FC<{isActive: boolean, user: IUser}> = ({isActive, user}) => {

    const logout = useAuthStore(state => state.logout)

    return (
        <>
            {isActive && (
                <div className={styles.dropDown}>
                    {(user && user.is_seller) && <Link to={'/'} className={styles.dropDownItem}>Лоты</Link>}

                    <Link to={'/settings'} className={styles.dropDownItem}>Настройки</Link>
                    
                    <div className={`${styles.dropDownItem} ${styles.exitItem}`} onClick={() => logout()}>Выйти</div>
                </div>
            )}
        </>
    )
}


export default UserMenu