import { FC, memo } from "react"
import { Bid as IBid } from "../../../../types/auction"
import styles from './BidsBlock.module.css'
import formatPrice from "../../../../helpers/priceFormatter"
import { formatTimeFromEvent } from "../../../../helpers/timeFormatter"


const Bid: FC<{ bid: IBid }> = ({
    bid,
}) => {
    return (
        <div className={styles.bid}>
            <div>
                <span className={styles.bidderUsername}>{bid.bidderUsername}</span>
                <span className={styles.timeFromPlacing}>
                    {bid.secondsFromPlacing ? (
                        formatTimeFromEvent(bid.secondsFromPlacing) + ' назад'
                    ) : <>недавно</>}
                </span>
            </div>
            <span className={styles.bidValue}>₽ {formatPrice(bid.value)}</span>
        </div>
    )
}

export default memo(Bid)
