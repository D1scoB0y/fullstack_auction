import { create } from "zustand"
import { Bid, Lot } from "../../../types/auction"
import getLot from "../api/getLot"


interface LotStore {
    lot: Lot | null
    bids: Bid[] | null
    fetchLot: (lotId: string) => Promise<void>
    updateCurrentBid: (
        newBid: Bid,
    ) => Promise<void>
}

const useLotStore = create<LotStore>(set => ({
    lot: null,
    bids: null,
    fetchLot: async (lotId) => {
        set({ lot: null, bids: null })
        const [lot, bids] = await getLot(lotId)
        set({ lot, bids })
    },
    updateCurrentBid: async (
        newBid,
    ) => {
        set(state => {
            if (!state.lot || !state.bids) {
                return state
            }

            return {
                lot: {
                    ...state.lot,
                    currentBid: newBid.value
                },
                bids: [
                    newBid,
                    ...state.bids,
                ]
            }
        })
    },
}))

export { useLotStore }
