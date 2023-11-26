export interface Lot {
    lotId: string
    title: string
    description: string
    endDate: string
    timeToEnd: number
    basePrice: number
    sellerId: number
    currentBid: number
    images: string[]
}

export interface EndedLot {
    lotId: number
    title: string
    endDate: string
    image: string
    endedWithBids: boolean
}

export interface EndedLotBid {
    bidderUsername: string
    bidderEmail: string
    bidderContacts: string
    place: number
    value: number
}

export interface LotPreview {
    id: number
    title: string
    currentBid: number
    timeToEnd: number
    image: string
    status: string
}

export interface CreateLot {
    title: string
    description: string
    endDate: string
    basePrice: string
    images: File[]
}

export interface Bid {
    bidderUsername: string
    value: number
    secondsFromPlacing: number 
}

export interface UserBid {
    lotId: string
    maxUserBidValue: number
    lotTitle: string
    currentBid: number
    image: string
    timeToEnd: number
    lotEndDate: string
}
