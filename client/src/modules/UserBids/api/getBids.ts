import { UserBid } from "../../../types/auction";
import client from "../../../api/client";


interface Response {
    bidsQty: number
    bids: UserBid[]
}

const getBids = async (
    page: number,
    token: string,
): Promise<Response | null> => {
    const headers = {
        Authorization: 'Bearer ' + token
    }

    try {
        const res = await client.get('auction/user-bids', { headers, searchParams: { page } }).json()
        return res as Response
    } catch (e) {
        return null
    }
}

export default getBids
