import { memo } from 'react'
import styles from './SignInHint.module.css'
import { Link } from 'react-router-dom'


const SignInHint = () => {
    return (
        <div className={styles.signInHint}>
            <span className={styles.signInHintText}>Уже есть аккаунт?</span>
            <Link
                to="/login"
                className={styles.signInHintHref}
            >
                Войти
            </Link>
        </div>
    )
}

export default memo(SignInHint)