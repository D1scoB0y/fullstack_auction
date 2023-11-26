import { FC, useState } from 'react'
import styles from './LotCard.module.css'
import { LotPreview } from '../../types/auction'
import Timer from '../../components/Timer/Timer'
import { Link } from 'react-router-dom'
import formatPrice from '../../helpers/priceFormatter'


interface Props {
    lot: LotPreview
}

const LotCard: FC<Props> = ({
    lot,
}) => {
    const [timer, setTimer] = useState<number>(lot.timeToEnd)

    return (
        <Link className={styles.lotCard} to={`/lot/${lot.id}`}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={lot.image} alt="lot image" loading="lazy" />
            </div>

            <span className={styles.title}>{lot.title}</span>

            <span className={styles.currentBidText}>
                {timer ? (<>Текущая ставка</>) : (<>Финальная ставка</>)}
            </span>

            <span className={styles.currentBid}>₽ {formatPrice(lot.currentBid)}</span>

            {!timer ? (
                <span className={styles.auctionClosed}>Закрыт</span>
            ) : (
                <Timer
                    timer={lot.timeToEnd}
                    setTimer={setTimer}
                    className={styles.timer}
                />
            )}
        </Link>
    )
}

export default LotCard
