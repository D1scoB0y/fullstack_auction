import { Dispatch, FC, SetStateAction } from 'react'
import { EndedLot as EndedLotType } from '../../../../types/auction'
import styles from './EndedLot.module.css'
import moment from 'moment'
import { timezoneOffset } from '../../../../helpers/timeFormatter'
import clsx from 'clsx'
import Button from '../../../../UI/Button/Button'
import { Link } from 'react-router-dom'
import archiveLot from '../../api/archiveLot'
import { useUserContext } from '../../../../context/UserContext'
import { useSnackbarContext } from '../../../../context/SnackbarContext'


interface Props {
    lot: EndedLotType
    setLots: Dispatch<SetStateAction<EndedLotType[]>>
}

const EndedLot: FC<Props> = ({
    lot,
    setLots,
}) => {
    const {
        token,
    } = useUserContext()

    const {
        showSnackbar,
    } = useSnackbarContext()

    const handleArchiveLot = async () => {
        const isArchived = await archiveLot(lot.lotId, token as string)

        if (isArchived) {
            setLots(prev => prev.filter(endedLot => endedLot.lotId != lot.lotId))
            showSnackbar('success', 'Лот архивирован')
        } else {
            showSnackbar('fail', 'Ошибка, попробуйте позже')
        }
    }

    return (
        <div className={styles.lot}>
            <img
                src={lot.image}
                alt="lot image"
                className={styles.img}
            />

            <div className={styles.lotInfo}>
                <span className={styles.title}>{lot.title}</span>

                <span className={styles.endDate}>
                    Дата закрытия: {moment(
                        Date.parse(lot.endDate) - timezoneOffset(),
                    ).format('DD.MM.YYYY H:mm')}
                </span>
                
                <span
                    className={clsx(
                        styles.status,
                        lot.endedWithBids
                            ? styles.withBids
                            : styles.withoutBids,
                    )}
                >
                    {lot.endedWithBids ? <>Есть ставки</> : <>Ставок нет</>}
                </span>
                
                
                {lot.endedWithBids && (
                    <Link
                        to={`/ended-lot/${lot.lotId}`}
                    >
                        <Button
                            text='Выбрать победителя'
                            className={styles.selectWinnerButton}
                        />

                    </Link>
                )}

                <span
                    className={styles.lotAction}
                    onClick={handleArchiveLot}
                >
                    В архив
                </span>
            </div>
        </div>
    )
}

export default EndedLot