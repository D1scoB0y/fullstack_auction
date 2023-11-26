import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { LotPreview } from "../../../../types/auction"
import getActiveLots from "../../api/getActiveLots"
import LotsGrid from "../../../../UI/LotsGrid/LotsGrid"
import styles from '../../UserLots/UserLots.module.css'
import Pagination from "../../../../components/Pagination/Pagination"


interface Props {
    lots: LotPreview[]
    setLots: Dispatch<SetStateAction<LotPreview[]>>
}

const ActiveLots: FC<Props> = ({
    lots,
    setLots,
}) => {
    const [page, setPage] = useState<number>(1)
    const [lotsQty, setLotQty] = useState<number>(0)

    useEffect(() => {
        (async () => {
            const res = await getActiveLots(page)

            if (res) {
                setLotQty(res.lotsQty)
                setLots(res.lots)
            }
        })()
    }, [page])

    return (
        lots.length ? (
            <>
                <LotsGrid lots={lots}/>
                <Pagination
                    currentPage={page}
                    onPageChange={setPage}
                    totalPages={Math.ceil(lotsQty / 15)}
                />
            </>
        ) : (
            <div className={styles.noLots}>Активных лотов пока нет</div>
        )
    )
}

export default ActiveLots
