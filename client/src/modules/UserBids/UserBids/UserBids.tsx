import { useEffect, useState } from "react"
import Bid from "../components/Bid"
import { UserBid } from "../../../types/auction"
import getBids from "../api/getBids"
import { useUserContext } from "../../../context/UserContext"
import styles from './UserBids.module.css'
import Pagination from "../../../components/Pagination/Pagination"


const UserBids = () => {
    const [bids, setBids] = useState<UserBid[]>([])
    const [page, setPage] = useState<number>(1)
    const [bidsQty, setBidsQty] = useState<number>(0)

    const {
        token,
    } = useUserContext()

    useEffect(() => {
        (async () => {
            const res = await getBids(page, token as string)

            if (res) {
                setBids(res.bids)
                setBidsQty(res.bidsQty)
            }
        })()
    }, [page])

    return (
        bids.length ? (
            <>
                <div className={styles.bidsContainer}>
                    {bids.map(bid => <Bid key={bid.lotId} bid={bid} />)}
                </div>
                <Pagination
                    currentPage={page}
                    onPageChange={setPage}
                    totalPages={Math.ceil(bidsQty / 16)}
                />
            </>
        ) : (
            <div className={styles.noBids}>
                Ставок пока нет
            </div>
        )
    )
}

export { UserBids }
