import { FC, useState } from 'react'

import styles from './LotCard.module.css'

import { ILotPreview } from '@/types/auction.interface'
import Timer from '../Timer/Timer'


interface ILotCardProps {
    lot: ILotPreview
}

const LotCard: FC<ILotCardProps> = ({
    lot,
}) => {

    const [timeToEnd, setTimeToEnd] = useState<number>(lot.timeToEnd)

    return (
        <div className={styles.lotCard}>

            <div className={styles.imgContainer}>
                <img
                    className={styles.img}
                    src={lot.image}
                    alt="lot image"
                    loading='lazy'
                />
            </div>

            <span className={styles.title}>{lot.title}</span>

            <span className={styles.currentBidText}>Текущая ставка</span>

            <span className={styles.currentBid}>₽ {lot.currentBid}</span>

            <Timer
                timer={timeToEnd}
                setTimer={setTimeToEnd}
                className={styles.timer}
            />

        </div>
    )
}


export default LotCard
