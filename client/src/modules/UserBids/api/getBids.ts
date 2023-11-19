import { UserBid } from "../../../types/auction";
import client from "../../../api/client";


const getBids = async (
    token: string
): Promise<UserBid[]> => {
    const headers = {
        Authorization: 'Bearer ' + token
    }

    try {
        const bids = await client.get('auction/user-bids', { headers }).json()
        return bids as UserBid[]
    } catch (e) {
        return []
    }
}

export default getBids
