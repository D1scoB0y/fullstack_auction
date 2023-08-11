import { FC, memo } from 'react'

import styles from './SubmitButton.module.css'


interface ISubmitButtonProps {
    text: string
    disabled?: boolean
}


const SubmitButton: FC<ISubmitButtonProps> = memo(({
    text,
    disabled
}) => {
    return (
        <button
            className={styles.submitButton}
            disabled={disabled}
        >
            {text}
        </button>
    )
})


export default SubmitButton
