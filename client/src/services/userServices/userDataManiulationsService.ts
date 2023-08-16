import api from "@/utils/api";
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
        await api.patch('/auth/change-password', data, requestConfig)
        return true
    } catch (e) {
        return false
    }
}


type TypeRequestPasswordReset = (email: string) => Promise<boolean>
const requestPasswordReset: TypeRequestPasswordReset = async (email) => {

    const requestConfig = {
        params: {
            email
        }
    }

    try {
        await api.get('/auth/reset-password/request-password-reset', requestConfig)
        return true
    } catch (e) {
        return false
    }
}


type TypeResetPassword = (token: string, newPassword: string) => Promise<boolean>
const resetPassword: TypeResetPassword = async (token, newPassword) => {

    const data = {
        token: token,
        new_password: newPassword,
    }

    try {
        await api.patch('/auth/reset-password/reset-password', data)
        return true
    } catch (e) {
        return false
    }
}


export {
    updateUser,
    changePassword,
    requestPasswordReset,
    resetPassword
}
