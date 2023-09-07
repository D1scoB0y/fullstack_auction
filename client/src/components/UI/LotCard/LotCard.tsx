import { FC } from 'react'

import styles from './LotCard.module.css'

import { ILotPreview } from '@/types/auction.interface'


interface ILotCardProps {
    lot: ILotPreview
}

const LotCard: FC<ILotCardProps> = ({
    lot,
}) => {


    return (
        <div className={styles.lotCard}>

            <div className={styles.imgContainer}>
                <img
                    className={styles.img}
                    src={lot.image}
                    alt="lot image"
                />
            </div>

            <span className={styles.title}>{lot.title}</span>

            <span className={styles.currentBidText}>Текущая ставка</span>

            <span className={styles.currentBid}>₽ {lot.currentBid}</span>

            <span className={styles.timeToEnd}>Осталось: {lot.formattedTimeToEnd}</span>
 

        </div>
    )
}


export default LotCard
