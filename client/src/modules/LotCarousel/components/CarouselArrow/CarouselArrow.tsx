import { FC } from "react"
import styles from './CarouselArrow.module.css'
import clsx from "clsx"


interface Props {
    onClick: () => void
    hide: boolean
    right?: boolean
}

const CarouselArrow: FC<Props> = ({
    onClick,
    hide,
    right,
}) => {
    return (
        <img
            src="/arrow.png"
            alt="arrow icon"
            onClick={onClick}
            className={
                clsx(
                    styles.arrow,
                    right && styles.rightArrow,
                    hide && styles.hideArrow
                )
            }
        />
    )
}

export default CarouselArrow
