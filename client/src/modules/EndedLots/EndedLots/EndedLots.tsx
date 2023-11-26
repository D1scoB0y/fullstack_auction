import { useEffect, useState } from "react"
import { EndedLot as EndedLotType } from "../../../types/auction"
import getEndedLots from "../api/getEndedLots"
import { useUserContext } from "../../../context/UserContext"
import EndedLot from "../components/EndedLot/EndedLot"
import styles from './EndedLots.module.css'
import Pagination from "../../../components/Pagination/Pagination"


const EndedLots = () => {
    const [endedLots, setEndedLots] = useState<EndedLotType[]>([])
    const [page, setPage] = useState<number>(1)
    const [lotsQty, setLotsQty] = useState<number>(1)

    const {
        token,
    } = useUserContext()

    useEffect(() => {
        (async () => {
            const res = await getEndedLots(page, token as string)

            if (res) {
                setEndedLots(res.lots)
                setLotsQty(res.lotsQty)
            }
        })()
    }, [page])

    return (
        endedLots.length ? (
            <>
                {endedLots.map(lot => (
                    <EndedLot
                        lot={lot}
                        setLots={setEndedLots}
                        key={lot.lotId}
                    />
                ))}
                <Pagination
                    currentPage={page}
                    onPageChange={setPage}
                    totalPages={Math.ceil(lotsQty / 15)}
                />
            </>
        ) : (
            <div className={styles.noLots}>Закрытых лотов пока нет</div>
        )
    )
}

export { EndedLots }
