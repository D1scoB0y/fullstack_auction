import { FC } from 'react'
import styles from './UserMenu.module.css'
import { IUser } from '@/types/user.interface'
import { useStore } from 'zustand'
import useAuthStore from '@/stores/AuthStore'
import Link from 'next/link'

const UserMenu: FC<{isActive: boolean, user: IUser}> = ({isActive, user}) => {

    const logout = useStore(useAuthStore, state => state.logout)

  return (
    <>
        {isActive && (
            <div className={styles.dropDown}>
                {(user && user.is_seller) && <Link href={'/'} className={styles.dropDownItem}>Лоты</Link>}
                <Link href={'/settings'} className={styles.dropDownItem}>Настройки</Link>
                <div className={`${styles.dropDownItem} ${styles.exitItem}`} onClick={() => logout()}>Выйти</div>
            </div>
        )}
    </>
  )
}


export default UserMenu
