import { FC } from 'react'
import styles from './TextArea.module.css'


interface Props {
    value: string
    onChange: (inputValue: string) => void
    placeholder?: string
    maxLength?: number
    style?: React.CSSProperties
}

const TextArea: FC<Props> = ({
    value,
    onChange,
    placeholder,
    maxLength,
    style,
}) => {
    return (
        <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            style={style}
            className={styles.textArea}
            spellCheck="false"
            autoComplete="off"
        />
    )
}

export default TextArea
