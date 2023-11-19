import client from "../../../api/client"


const placeBid = async (
    lotId: string,
    value: string,
    token: string,
): Promise<boolean> => {
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    try {
        await client.post('auction/bids', { headers, json: { lotId, value } })
        return true
    } catch (e) {
        return false
    }
}

export default placeBid
