import { FC, memo } from 'react'

import styles from './ErrorsMessage.module.css'


const ErrorMessage: FC<{errorText: string}> = ({
    errorText,
}) => {
    return (
        <span className={styles.errorMessage}>{errorText}</span>
    )
}


export default memo(ErrorMessage)
