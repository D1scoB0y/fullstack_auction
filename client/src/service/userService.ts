import api from "@/api";
import { IUser, IRegistrationData, ILoginData } from "@/types/user.interface";


type TypeRegisterUser = (registrationData: IRegistrationData) => Promise<IUser|null>

const registerUser: TypeRegisterUser = async (registrationData) => {
    try {
        const response = await api.post('/auth/registration', registrationData)
        return response.data
    } catch(e) {
        console.log(e)
    }
}


type TypeLoginUser = (loginData: ILoginData) => Promise<IUser|null>

const loginUser: TypeLoginUser = async (loginData) => {
    try {
        const response = await api.post('/auth/login', loginData)
        return response.data
    } catch(e) {
        console.log(e)
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
    checkEmail,
    checkUsername,
}
