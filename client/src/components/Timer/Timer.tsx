import {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from 'react'

import { formatTime } from '../../helpers/timeFormatter'


interface Props {
    timer: number
    setTimer: Dispatch<SetStateAction<number>>
    setTimerEnded?: Dispatch<SetStateAction<boolean>>
    className: string
    withSeconds?: boolean
}

const Timer: FC<Props> = ({
    timer,
    setTimer,
    className,
    withSeconds,
}) => {
    const [localTimer, setLocalTimer] = useState<number>(timer)
    const [formattedTime, setFormattedTime] = useState<string>('')

    useEffect(() => {
        setFormattedTime(formatTime(localTimer, !!withSeconds))

        if (localTimer > 0) {
            const t = setTimeout(
                () => setLocalTimer(prev => prev - 1),
                1000,
            )

            return () => clearTimeout(t)
        }
        setTimer(0)
    })

    return <span className={className}>{formattedTime}</span>
}

export default Timer
