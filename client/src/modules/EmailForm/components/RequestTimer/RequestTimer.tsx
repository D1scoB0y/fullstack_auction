import { Dispatch, FC, SetStateAction } from 'react'

import styles from './RequestTimer.module.css'
import Timer from '../../../../components/Timer/Timer'


interface Props {
    timer: number
    setTimer: Dispatch<SetStateAction<number>>
}

const RequestTimer: FC<Props> = ({
    timer,
    setTimer,
}) => {
    if (timer) {
        return (
            <span className={styles.requestTimerText}>
                Отправить еще раз
                <Timer
                    timer={timer}
                    setTimer={setTimer}
                    className={styles.requestTimer}

                />
            </span>
        )
    }
}

export default RequestTimer