import { FC } from 'react'
import styles from './UserMenu.module.css'
import { IUser } from '@/types/user.interface'
import { useStore } from 'zustand'
import useAuthStore from '@/store/AuthStore'


const UserMenu: FC<{isActive: boolean, user: IUser}> = ({isActive, user}) => {

    const logout = useStore(useAuthStore, state => state.logout)

  return (
    <>
        {isActive && (
            <div className={styles.dropDown}>
                {(user && user.is_seller) && <div className={styles.dropDownItem}>Лоты</div>}
                <div className={styles.dropDownItem}>Настройки</div>
                <div className={`${styles.dropDownItem} ${styles.exitItem}`} onClick={() => logout()}>Выйти</div>
            </div>
        )}
    </>
  )
}


export default UserMenu
