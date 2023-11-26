import { FC, useState } from "react"
import { Lot } from "../../../../types/auction"
import styles from './LotInfo.module.css'
import Line from "../../../../UI/Line/Line"
import Timer from "../../../../components/Timer/Timer"
import moment from "moment"
import { timezoneOffset } from "../../../../helpers/timeFormatter"
import BidForm from "../BidForm/BidForm"
import formatPrice from "../../../../helpers/priceFormatter"


const LotInfo: FC<{ lot: Lot }> = ({
    lot,
}) => {
    const [timer, setTimer] = useState<number>(lot.timeToEnd)

    return (
        <div className={styles.info}>
            <span className={styles.title}>{lot.title}</span>

            <span className={styles.currentBid}>₽ {formatPrice(lot.currentBid)}</span>

            <Line />

            {timer > 0 ? (
                <span className={styles.timeToEnd}>
                    Закрывается через:
                        <Timer
                            timer={timer}
                            setTimer={setTimer}
                            className={styles.timer}
                            withSeconds
                        />
                </span>
            ) : (
                <span className={styles.closed}>
                    Закрыт
                </span>
            )}

            <span className={styles.endDate}>
                Дата закрытия: {moment(Date.parse(lot.endDate) - timezoneOffset()).format(
                    'DD.MM.YYYY H:mm',
                )}
            </span>

            {timer > 0 && (
                <>
                    <Line />
                    <BidForm
                        lot={lot}
                    />   
                </>
            )}

            {lot.description && (
                <>
                    <Line />
                    <span className={styles.description}>{lot.description.trim()}</span>
                </>
            )}
        </div>
    )
}

export default LotInfo
