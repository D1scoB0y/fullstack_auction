import { FC, memo } from "react"

import styles from './Input.module.css'


interface IInputProps {
    value: string|null
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    className?: string
    placeholder?: string
    maxLength?: number
    style?: React.CSSProperties
}


const Input: FC<IInputProps> = ({
    value,
    onChange,
    className,
    placeholder,
    maxLength,
    style,
    type='text',
}) => {
    return (
        <input
            type={type}
            value={value || ''}
            onChange={onChange}
            className={`${styles.input} ${className}`}
            placeholder={placeholder}
            maxLength={maxLength}
            style={style}
            autoComplete='off'
            spellCheck='false'
        />
    )
}


export default memo(Input)
