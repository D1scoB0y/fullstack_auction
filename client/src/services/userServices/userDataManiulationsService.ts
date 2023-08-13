import api from "@/api"
import { IUpdateData } from "@/types/user.interface"


type TypeUdateUser = (freshData: IUpdateData, token: string) => Promise<number|null>
const updateUser: TypeUdateUser = async (freshData, token) => {

    // returns 204 status or null if token is invalid or if any field is alredy taken by other user

    const requestConfig = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    try {
        const response = await api.put('/auth/update-user', freshData, requestConfig)
        return response.status
    } catch(e) {
        return null
    }
}


type TypeChangePassword = (newPassword: string, currentPassword: string, token: string) => Promise<boolean>
const changePassword: TypeChangePassword = async (newPassword, currentPassword, token) => {

    const data = {
        new_password: newPassword,
        current_password: currentPassword
    }

    const requestConfig = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    try {
        await api.put('/auth/change-password', data, requestConfig)
        return true
    } catch (e) {
        return false
    }
}



export {
    updateUser,
    changePassword,
}
