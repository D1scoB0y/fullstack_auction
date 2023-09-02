

import { Dispatch, FC, SetStateAction } from 'react'
import styles from './DataPicker.module.css'


interface IDatePickerProps {
    endDate: string
    setEndDate: Dispatch<SetStateAction<string>>
}

const DatePicker: FC<IDatePickerProps> = ({
    endDate,
    setEndDate,
}) => {
    return (
        <input
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className={styles.datePicker}
            type="datetime-local"
        />
    )
}


export default DatePicker
