import { FC, memo } from "react"

import styles from './Button.module.css'
import ButtonLoadingOverlay from "../ModalLoaderOverlay/ButtonLoadingOverlay"


interface IButtonProps {
    text: string
    className?: string
    isLoading?: boolean
    onClick?: () => void
    style?: React.CSSProperties
    disabled?: boolean
    preventDefault?: boolean
}


const Button: FC<IButtonProps> = ({
    text,
    className,
    isLoading,
    onClick,
    style,
    disabled=false,
    preventDefault=false,
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
            className={`${styles.button} ${className}`}
            style={{...style}}
            onClick={onClickHandler}
            disabled={disabled || isLoading}
        >
            {text}

            {isLoading && <ButtonLoadingOverlay />}

        </button>
    )
}


export default memo(Button)
