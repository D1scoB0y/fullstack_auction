import api from "@/api";
import { IUser, IRegistrationData, ILoginData } from "@/types/user.interface";


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


type TypeCheckEmail = (email: string) => Promise<boolean>
const checkEmail: TypeCheckEmail = async (email) => {
    try {
        await api.get('/auth/check-email', {params: {email}})
        return true
    } catch(e) {
        return false
    }
}


type TypeCheckUsername = (username: string) => Promise<boolean>
const checkUsername: TypeCheckUsername = async (username) => {
    try {
        await api.get('/auth/check-username', {params: {username}})
        return true
    } catch(e) {
        return false
    }
}

export {
    registerUser,
    loginUser,
    getUser,
    checkEmail,
    checkUsername,
}
