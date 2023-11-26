import client from "../../../api/client"
import { LotPreview } from "../../../types/auction"


interface Response {
    lotsQty: number
    lots: LotPreview[]
}

const getArchivedLots = async (
    token: string,
    page: number,
): Promise<Response | null> => {
    const headers = {
        Authorization: 'Bearer ' + token
    }

    try {
        const res = await client.get('auction/archived-lots', { headers, searchParams: { page } }).json()
        return res as Response
    } catch (e) {
        return null
    }
}

export default getArchivedLots