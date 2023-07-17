import api from "@/api";
import { IUser, IRegistrationData, ILoginData, IUpdateData, ISettingsData } from "@/types/user.interface";


type TypeRegisterUser = (registrationData: IRegistrationData) => Promise<string|null>
const registerUser: TypeRegisterUser = async (registrationData) => {
    try {
        const response = await api.post('/auth/registration', registrationData)
        return response.data
    } catch(e) {
        console.log(e)
        return null
    }
}


type TypeLoginUser = (loginData: ILoginData) => Promise<string|null>
const loginUser: TypeLoginUser = async (loginData) => {

    const data = JSON.stringify(
        `grant_type=&username=${loginData.email}&password=${loginData.password}&scope=&client_id=&client_secret=`
    )

    const requestConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }

    try {
        JSON.stringify
        const response = await api.post('/auth/login', data, requestConfig)
        return response.data
    } catch(e) {
        console.log(e)
        return null
    }
}


type TypeGetUser = (token: string) => Promise<IUser|null>
const getUser: TypeGetUser = async (token) => {

    const requestConfig = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    try{
        const response = await api.get('/auth/get-user', requestConfig)
        return response.data
    } catch(e) {
        console.log(e)
        return null
    }
}


type TypeUdateUser = (settingsData: ISettingsData, token: string) => Promise<boolean>
const updateUser: TypeUdateUser = async (settingsData, token) => {

    const requestConfig = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    try {
        const response = await api.put('/auth/update-user', settingsData, requestConfig)
        return true
    } catch(e) {
        return false
    }
}


type TypeSendPhoneVerificationCallRequest = (token: string) => Promise<boolean>
const sendPhoneVerificationCallRequest: TypeSendPhoneVerificationCallRequest = async (token) => {
    const requestConfig = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    try {
        await api.get('/auth/mobile/verification-call-request', requestConfig)
        return true
    } catch(e) {
        return false
    }
}


type TypeSendPhoneVerificationCode = (code: string, token: string) => Promise<boolean>
const sendPhoneVerificationCode: TypeSendPhoneVerificationCode = async (code, token) => {
    const requestConfig = {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params: {
            verif_code: code
        }
    }

    try {
        await api.get('/auth/mobile/validate-verification-code', requestConfig)
        return true
    } catch(e) {
        return false
    }
}


export {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    sendPhoneVerificationCallRequest,
    sendPhoneVerificationCode,
}
