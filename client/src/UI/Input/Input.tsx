import { FC } from 'react'

import styles from './Input.module.css'

interface Props {
    value: string | null
    onChange: (inputValue: string) => void
    type?: string
    className?: string
    placeholder?: string
    maxLength?: number
    style?: React.CSSProperties
}

const Input: FC<Props> = ({
    value,
    onChange,
    className,
    placeholder,
    maxLength,
    style,
    type = 'text',
}) => {
    return (
        <input
            type={type}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            className={`${styles.input} ${className}`}
            placeholder={placeholder}
            maxLength={maxLength}
            style={style}
            autoComplete="off"
            spellCheck="false"
        />
    )
}

export default Input
