import client from "../../../api/client"
import { LotPreview } from "../../../types/auction"


interface Response {
    lotsQty: number
    lots: LotPreview[]
}

const getActiveLots = async (
    page: number,
): Promise<Response | null> => {
    try {
        const res = await client.get('auction/active-lots', { searchParams: { page } }).json()
        return res as Response
    } catch (e) {
        return null
    }
}

export default getActiveLots
