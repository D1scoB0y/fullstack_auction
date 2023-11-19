import { FC } from 'react'
import styles from './DateInput.module.css'


interface Props {
    value: string
    onChange: (endDate: string) => void
    style: React.CSSProperties
}

const DateInput: FC<Props> = ({
    value,
    onChange,
    style,
}) => {
    return (
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            className={styles.datePicker}
            type="datetime-local"
            style={{ ...style }}
        />
    )
}

export default DateInput
