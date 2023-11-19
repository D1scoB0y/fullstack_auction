import { FC, memo } from 'react'

import styles from './Spinner.module.css'


interface Props {
    size?: number
    borderWidth?: number
    style?: React.CSSProperties
}

const Spinner: FC<Props> = ({
    size=64,
    borderWidth=2,
    style,
}) => {
    return (
        <div
            className={styles.spinner}
            style={{
                ...style,
                width: size,
                height: size,
                borderWidth: borderWidth,
            }}
        />
    )
}

export default memo(Spinner)
