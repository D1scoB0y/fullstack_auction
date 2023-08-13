import { memo } from "react"

import Loader from "@/components/UI/Loader/Loader"
import styles from './ModalLoaderOverlay.module.css'


const ModalLoaderOverlay = () => {
  return (
    <div className={styles.loaderOverlay}>
      <Loader
        width={56}
        height={56}
        style={{position: 'absolute'}}
      />
    </div>
  )
}


export default memo(ModalLoaderOverlay)
