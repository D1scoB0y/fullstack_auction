import { CreateLot } from "../../../types/auction"
import client from "../../../api/client"

const createLot = async (
    data: CreateLot,
    token: string,
): Promise<boolean> => {
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    const formData = new FormData()
    const UTCEndDate = new Date(data.endDate).toISOString()

    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('endDate', UTCEndDate)
    formData.append('basePrice', data.basePrice)

    data.images.forEach(img => formData.append('images', img))

    try {
        await client.post('auction/lots', { body: formData, headers } )
        return true
    } catch (e) {
        return false
    }
}

export default createLot
