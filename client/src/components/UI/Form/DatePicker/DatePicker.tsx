

import styles from './DataPicker.module.css'


const DatePicker = () => {
    return (
        <input
            type="datetime-local"
            className={styles.datePicker}
            lang='ru'
        />
    )
}


export default DatePicker
