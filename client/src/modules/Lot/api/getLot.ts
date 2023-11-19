import client from "../../../api/client"
import { Bid, Lot } from "../../../types/auction"


type LotInfo = [Lot | null, Bid[] | null]

const getLot = async (
    lotId: string,
): Promise<LotInfo> => {
    const res = []

    try {
        const lot = await client.get(`auction/lots/${lotId}`).json()
        res.push(lot)
    } catch (e) {
        return [null, null]
    }

    try {
        const bids = await client.get(`auction/lot-bids?lot_id=${lotId}`).json()
        res.push(bids)
    } catch (e) {
        return [null, null]
    }

    return res as LotInfo
}

export default getLot
