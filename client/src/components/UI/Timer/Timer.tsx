import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

import { formatTime } from "@/utils/timeFormatter"


interface ITimerProps {
    timer: number
    setTimer: Dispatch<SetStateAction<number>>
    className: string
}

const Timer: FC<ITimerProps>  = ({
    timer,
    setTimer,
    className,
}) => {

    const [formattedTime, setFormattedTime] = useState<string>('')

    useEffect(() => {

        setFormattedTime(formatTime(timer))

        if (timer > 0) {

            const t = setTimeout(
                () => {
                    setTimer(prev => prev - 1)
                },
                1000
            )

            return () => clearTimeout(t);
        }
    })

    if (timer > 0) {
        return <span className={className}>{formattedTime}</span>
    }
}


export default Timer
