import { FC, memo } from 'react'
import styles from './ErrorsMessage.module.css'


export interface IErrorMessageProps {
    errorText: string
}


const ErrorMessage: FC<IErrorMessageProps> = ({
    errorText
}) => {
    return (
        <span className={styles.errorMessage}>{errorText}</span>
    )
}


export default memo(ErrorMessage)
