import { FC, memo } from "react"

import styles from './Button.module.css'


interface IButtonProps {
    text: string
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
    style?: React.CSSProperties
    disabled?: boolean
}


const Button: FC<IButtonProps> = ({
    text,
    onClick,
    style,
    disabled=false,
}) => {
  return (
    <button
        className={styles.button}
        style={{...style}}
        onClick={onClick}
        disabled={disabled}
    >
        {text}
    </button>
  )
}


export default memo(Button)
