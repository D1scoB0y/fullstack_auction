import styles from './BidsBlock.module.css'
import Bid from "./Bid"
import { useLotStore } from '../..'
import { useState } from 'react'


const BidsBlock = () => {
    const [showAll, setShowAll] = useState<boolean>(false)

    const bids = useLotStore(state => state.bids)

    if (!bids || !bids.length) {
        return
    }

    return (
        <div className={styles.bidsBlock}>
            <span className={styles.label}>Последние ставки</span>

            {bids.slice(0, 5).map(bid => (
                <Bid
                    key={bid.value}
                    bid={bid}
                />
            ))}

            {bids.length > 5 && (
                <span
                    className={styles.showMore}
                    onClick={() => setShowAll(prev => !prev)}
                >
                    {showAll ? <>Скрыть</> : <>Показать все ({bids.length})</>}
                </span>
            )}

            {showAll && bids.slice(5, bids.length).map(bid => (
                <Bid
                    key={bid.value}
                    bid={bid}
                />
            ))}
        </div>
    )
}

export default BidsBlock
