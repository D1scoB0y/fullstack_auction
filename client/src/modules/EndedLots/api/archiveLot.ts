import client from "../../../api/client";


const archiveLot = async (
    lotId: number,
    token: string,
): Promise<boolean> => {
    const headers = {
        Authorization: 'Bearer ' + token
    }

    const json = { lotId }

    try {
        await client.patch('auction/archive-lot', { headers, json })
       return true 
    } catch (e) {
        return false
    }
}

export default archiveLot
