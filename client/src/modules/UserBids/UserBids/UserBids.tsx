import { useEffect, useState } from "react"
import Bid from "../components/Bid"
import { UserBid } from "../../../types/auction"
import getBids from "../api/getBids"
import { useUserContext } from "../../../context/UserContext"
import styles from './UserBids.module.css'


const UserBids = () => {
    const [bids, setBids] = useState<UserBid[]>([])

    const {
        token,
    } = useUserContext()

    useEffect(() => {
        (async () => {
            const fetchedBids = await getBids(token as string)
            setBids(fetchedBids)
        })()
    }, [])

    return (
        <div className={styles.bidsContainer}>
            {bids.map(bid => <Bid key={bid.lotId} bid={bid} />)}
        </div>
    )
}

export { UserBids }
