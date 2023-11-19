import client from './client'
import type { LotPreview } from '../types/auction'


const AuctionService = {
    getLots: async (page: number): Promise<LotPreview[] | null> => {
        try {
            const lots = await client.get('auction/lots', { searchParams: { page } }).json()
            return lots as LotPreview[]
        } catch (e) {
            return null
        }
    },
}

export default AuctionService
