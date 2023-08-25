import { FC } from 'react'

import styles from './HiddenErrorMessage.module.css'


const HiddenErrorMessage: FC<{errorText: string}> = ({
    errorText,
}) => {

    if (errorText) {
        return <span className={styles.hiddenErrorMessage}>{errorText}</span>
    }
}


export default HiddenErrorMessage
