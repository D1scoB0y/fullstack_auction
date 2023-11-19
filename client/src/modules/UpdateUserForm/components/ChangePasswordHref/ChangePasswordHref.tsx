import { memo } from 'react'
import { Link } from 'react-router-dom'
import styles from './ChangePasswordHref.module.css'


const ChangePasswordHref = () => {
    return (
        <Link
            to="/change-password"
            className={styles.changePasswordHref}
        >
            Изменить пароль
        </Link>
    )
}

export default memo(ChangePasswordHref)
