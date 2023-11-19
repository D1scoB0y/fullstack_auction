import { Link } from 'react-router-dom'
import styles from './CreateAccountHint.module.css'
import { memo } from 'react'


const CreateAccountHint = () => {
    return (
        <div className={styles.createAccountHint}>
            <span className={styles.createAccountHintText}>Нет аккаунта?</span>
            <Link
                to="/registration"
                className={styles.createAccountHintHref}
            >
                Создать
            </Link>
        </div>
    )
}

export default memo(CreateAccountHint)
