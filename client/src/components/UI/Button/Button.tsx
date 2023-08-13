import { FC, memo } from "react"

import styles from './Button.module.css'


interface IButtonProps {
    text: string
    onClick?: () => void
    style?: React.CSSProperties
    disabled?: boolean
    preventDefault?: boolean
}


const Button: FC<IButtonProps> = ({
    text,
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
            className={styles.button}
            style={{...style}}
            onClick={onClickHandler}
            disabled={disabled}
        >
            {text}
        </button>
    )
}


export default memo(Button)
