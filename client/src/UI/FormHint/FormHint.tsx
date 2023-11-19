import { FC, memo } from "react"
import styles from './FormHint.module.css'
import Line from "../Line/Line"


interface Props {
    text: string
}

const FormHint: FC<Props> = ({
    text,
}) => {
    return (
        <>
            <span
                className={styles.formHint}
            >
                {text}
            </span>
            <Line />
        </>
    )
}

export default memo(FormHint)
