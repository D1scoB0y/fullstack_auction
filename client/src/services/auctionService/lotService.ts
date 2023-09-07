import api from "@/utils/api";

import { ILot, ICreateLot, ILotPreview } from "@/types/auction.interface";


type TypeCreateLot = (lotData: ICreateLot, token: string) => Promise<boolean>
const createLot: TypeCreateLot = async (lotData, token) => {

    const requestConfig = {
        headers: {
            "Authorization": 'Bearer ' + token,
        },
    }

    const data = new FormData()

    data.append('title', lotData.title)
    data.append('description', lotData.description)
    data.append('endDate', lotData.endDate)
    data.append('basePrice', lotData.basePrice)
    data.append('reservePrice', lotData.reservePrice)

    for (const image of lotData.images) {
        data.append('images', image)
    }

    try {
        await api.post('/auction/lot', data, requestConfig)
        return true
    } catch (e) {
        return false
    }
}

type TypeGetLot = (lotId: string) => Promise<ILot|null>
const getLot: TypeGetLot = async (lotId) => {
    
    try {
        const res = await api.get('/auction/lot/' + lotId)
        return res.data
    } catch (e) {
        return null
    } 
}


type TypeGetLots = (page: number) => Promise<ILotPreview[]|null>
const getLots: TypeGetLots = async (page) => {

    const requestConfig = {
        params: {
            page: page,
        },
    }

    try {
        const lots = await api.get('/auction/lots', requestConfig)

        return lots.data
    } catch (e) {
        return null
    }
}


export {
    createLot,
    getLot,
    getLots,
}
