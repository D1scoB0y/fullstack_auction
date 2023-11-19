import { FC, memo } from 'react'

import styles from './Button.module.css'
import Spinner from '../Spinner/Spinner'


interface Props {
    text: string
    onClick?: () => void
    className?: string
    isLoading?: boolean
    style?: React.CSSProperties
    disabled?: boolean
    preventDefault?: boolean
}

const Button: FC<Props> = ({
    text,
    className,
    isLoading,
    style,
    disabled = false,
    preventDefault = false,
    onClick,
}) => {
    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (preventDefault) {
            e.preventDefault()
        }

        if (onClick) {
            onClick()
        }
    }

    return (
        <button
            style={{ ...style }}
            className={`${styles.button} ${className}`}
            onClick={ onClickHandler}
            disabled={disabled || isLoading}
        >
            {text}

            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <Spinner
                        size={32}
                        borderWidth={2}
                        style={{ position: 'absolute' }}
                    />
                </div>
            )}
        </button>
    )
}

export default memo(Button)
