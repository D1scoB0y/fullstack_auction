import { Dispatch, FC, SetStateAction, useEffect } from "react"


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

    useEffect(() => {

        if (timer > 0) {

            const timer = setTimeout(
                () => setTimer(prev => prev - 1),
                1000
            )

            return () => clearTimeout(timer);
        }
    })

    if (timer > 0) {
        return <span className={className}>{timer}</span>
    }
}


export default Timer
