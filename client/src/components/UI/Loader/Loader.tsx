import { FC, memo } from "react"

import styles from './Loader.module.css'


interface ILoaderProps {
    width: number
    height: number
    style?: React.CSSProperties
}


const Loader: FC<ILoaderProps> = ({
    width,
    height,
    style,
}) => {
  return (
    <div
        className={styles.loader}
        style={{
            ...style,
            width: width,
            height: height,
        }}
    ></div>
  )
}


export default memo(Loader)
