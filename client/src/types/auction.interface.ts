export interface ILot {
    title: string
    description: string
    endDate: string
    basePrice: string
    reservePrice: string
    images: string
}

export interface ICreateLot extends Omit<ILot, 'images'> {
    images: File[]
}
