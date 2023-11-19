import Gallery from "../components/Gallery/Gallery"
import styles from './Lot.module.css'
import LotInfo from "../components/LotInfo/LotInfo"
import BidsBlock from "../components/BidsBlock/BidsBlock"
import { useLotStore } from ".."
import HelpBlock from "../components/HelpBlock/HelpBlock"


const Lot = () => {
    const lot = useLotStore(state => state.lot)

    if (!lot) return

    return (
        <div className={styles.galleryInfoContainer}>
            <Gallery images={lot.images} />

            <div className={styles.lotDetails}>
                <LotInfo lot={lot} />
                <BidsBlock />
                <HelpBlock />
            </div>
        </div>
    )
}

export { Lot }
