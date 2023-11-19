import { Link } from "react-router-dom"

import styles from './ResetPasswordButton.module.css'
import { memo } from "react"


const ResetPasswordButton = () => {
    return (
        <Link
            to="/reset-password-step-1"
            className={styles.resetPasswordButton}
        >
            Сброс пароля
        </Link>
    )
}

export default memo(ResetPasswordButton)
