import { FC, memo } from 'react'

import styles from './Error.module.css'


const Error: FC<{ text: string }> = ({
    text,
}) => {
    return (
        <div className={styles.error} >
            <img
                src="/alert.png"
                alt="error icon"
                className={styles.errorIcon}
            />
            <span className={styles.errorText}>{text}</span>
        </div>
    )
}

export default memo(Error)
