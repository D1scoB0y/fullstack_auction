import client from "../../../api/client";
import { EndedLot } from "../../../types/auction";


interface Response {
    lotsQty: number
    lots: EndedLot[]
}

const getEndedLots = async (
    page: number,
    token: string
): Promise<Response | null> => {
    const headers = {
        Authorization: 'Bearer ' + token
    }

    try {
        const res = await client.get('auction/ended-lots', { headers, searchParams: { page } }).json()
        return res as Response
    } catch (e) {
        return null
    }
}

export default getEndedLots
