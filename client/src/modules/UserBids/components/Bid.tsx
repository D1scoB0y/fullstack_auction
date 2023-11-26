import { FC, useState } from "react"
import { UserBid } from "../../../types/auction"
import styles from './Bid.module.css'
import formatPrice from "../../../helpers/priceFormatter"
import { Link } from "react-router-dom"
import clsx from "clsx"
import Timer from "../../../components/Timer/Timer"
import { timezoneOffset } from "../../../helpers/timeFormatter"
import moment from "moment"


const Bid: FC<{ bid: UserBid }> = ({
    bid,
}) => {
    const [timer, setTimer] = useState<number>(bid.timeToEnd)

    const isOverbidded = bid.maxUserBidValue < bid.currentBid

    return (
        <Link to={`/lot/${bid.lotId}`} className={styles.lotHref}>
            <div className={styles.bid}>
                <div className={styles.imgContainer}>
                    <img src={bid.image} alt="lot image" className={styles.img} />
                </div>

                <div className={styles.bidInfo}>
                    <span className={styles.title}>{bid.lotTitle}</span>

                    <span className={styles.currentBidText}>
                        {timer > 0 ? <>Текущая ставка</> : <>Финальная ставка</>}
                    </span>

                    <span className={styles.currentBidValue}>₽ {formatPrice(bid.currentBid)}</span>

                    <span
                        className={clsx(
                            styles.statusText,
                            isOverbidded
                                ? styles.overbidded
                                : styles.leading,
                        )}
                    >
                        {isOverbidded
                            ? <>Ставка перебита</>
                            : timer > 0 ? <>Вы лидируете</> : <>Вы победили!</>
                        }
                    </span>

                    {timer > 0 ? (
                        <Timer
                            timer={timer}
                            setTimer={setTimer}
                            className={styles.timer}
                            withSeconds
                        />
                    ) : (
                        <span className={styles.closed}>
                            Закрыт
                        </span>
                    )}

                    <span className={styles.endDate}>
                        {moment(Date.parse(bid.lotEndDate) - timezoneOffset()).format(
                            'DD.MM.YYYY H:mm',
                        )}
                    </span>

                    
                </div>
            </div>
        </Link>
    )
}

export default Bid