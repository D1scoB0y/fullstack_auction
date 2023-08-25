import { memo } from "react"

import Loader from "@/components/UI/Loader/Loader"
import styles from './ButtonLoadingOverlay.module.css'


const ButtonLoadingOverlay = () => {
  return (
    <div className={styles.loaderOverlay}>
      <Loader
        width={32}
        height={32}
        style={{position: 'absolute'}}
      />
    </div>
  )
}


export default memo(ButtonLoadingOverlay)
