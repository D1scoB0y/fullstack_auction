import { memo } from "react"
import styles from './CloseCarouselButton.module.css'
import { useCarouselStore } from "../../store/useCarouselStore"


const CloseCarouselButton = () => {
    const closeCarousel = useCarouselStore(state => state.closeCarousel)
    
    return (
        <img
            className={styles.button}
            src="/white_cross.png"
            alt="cross icon"
            onClick={closeCarousel}
        />
    )
}

export default memo(CloseCarouselButton)
