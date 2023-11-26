import { FC, useEffect, useState } from 'react'
import { EndedLotBid } from '../../../types/auction'
import getEndedLotBids from '../api/getEndedLot'
import { useUserContext } from '../../../context/UserContext'
import { EndedLot as EndedLotType } from '../../../types/auction'
import styles from './EndedLot.module.css'
import moment from 'moment'
import { timezoneOffset } from '../../../helpers/timeFormatter'
import clsx from 'clsx'
import formatPrice from '../../../helpers/priceFormatter'


const EndedLot: FC<{ id: string }> = ({
    id,
}) => {
    const [lot, setLot] = useState<EndedLotType | null>(null)
    const [bids, setBids] = useState<EndedLotBid[] | null>(null)
    const [bidPage, setBidPage] = useState<number>(0)

    const {
        token,
    } = useUserContext()

    useEffect(() => {
        (async () => {
            const [lot, bids] = await getEndedLotBids(+id, token as string)
            setLot(lot)
            setBids(bids)
        })()
    }, [])

    if (!lot || !bids) {
        return <>404 not found</>
    }

    return (
        <div className={styles.lot}>
            <div className={styles.imgContainer}>
                <img
                    src={lot.image}
                    alt="lot image"
                    className={styles.img}
                />
            </div>

            <div className={styles.lotInfo}>
                <span className={styles.title}>{lot.title}</span>

                <span className={styles.endDate}>
                    Дата закрытия: {moment(Date.parse(lot.endDate) - timezoneOffset()).format(
                        'DD.MM.YYYY H:mm',
                    )}
                </span>

                <span className={styles.place}>Место {bids[bidPage].place} / {bids.length}</span>
                
                <div className={styles.infoNavContainer}>
                    <div className={styles.bidInfo}>
                        <div className={styles.bidderInfo}>

                            <span className={styles.infoHint}>Имя пользователя</span>
                            <span className={styles.infoValue}>{bids[bidPage].bidderUsername}</span>

                            <span className={styles.infoHint}>Электронная почта</span>
                            <span className={styles.infoValue}>{bids[bidPage].bidderEmail}</span>

                            <span className={styles.infoHint}>Максимальная ставка</span>
                            <span className={styles.infoValue}>₽ {formatPrice(bids[bidPage].value)}</span>
                        </div>
                        
                        <div className={styles.contactsContainer}>
                            <span className={styles.infoHint}>Контакты пользователя</span>
                            <span className={styles.infoValue}>{bids[bidPage].bidderContacts || 'Пользователь не указал контакты'}</span>
                        </div>
                    </div>

                    <div className={styles.bidsNavigation}>
                        <span
                            className={clsx(
                                styles.changeBid,
                                bidPage > 0 && styles.visible,
                            )}
                            onClick={() => setBidPage(page => page - 1)}
                        >
                            Предыдущая ставка
                        </span>

                        <span
                            className={clsx(
                                styles.changeBid,
                                bidPage < bids.length - 1 && styles.visible,
                            )}
                            onClick={() => setBidPage(page => page + 1)}
                        >
                            Следующая ставка
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { EndedLot }
