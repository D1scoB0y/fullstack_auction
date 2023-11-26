import client from './client'
import type { LotPreview } from '../types/auction'


interface GetLotsResponse {
    lotsQty: number
    lots: LotPreview[]
}

const AuctionService = {
    getLots: async (page: number): Promise<GetLotsResponse | null> => {
        try {
            const lots = await client.get('auction/active-lots', { searchParams: { page } }).json()
            return lots as GetLotsResponse
        } catch (e) {
            return null
        }
    },
}

export default AuctionService
