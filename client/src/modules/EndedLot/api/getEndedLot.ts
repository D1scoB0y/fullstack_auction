import client from "../../../api/client";
import { EndedLot, EndedLotBid } from "../../../types/auction";


type GetEndedLotWithBids = [EndedLot | null, EndedLotBid[] | null]


const getEndedLot = async (
    lotId: number,
    token: string
): Promise<GetEndedLotWithBids> => {
    const res = []

    const headers = {
        Authorization: 'Bearer ' + token
    }

    try {
        const lot = await client.get(`auction/ended-lots/${lotId}`, { headers }).json()
        res.push(lot)
    } catch (e) {
        return [null, null]
    }

    try {
        const bids = await client.get(`auction/ended-lot-bids/${lotId}`, { headers }).json()
        res.push(bids)
    } catch (e) {
        return [null, null]
    }

    return res as GetEndedLotWithBids
}

export default getEndedLot
