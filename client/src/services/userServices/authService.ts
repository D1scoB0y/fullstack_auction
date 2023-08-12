import api from "@/api";
import { IRegistrationData, ILoginData } from "@/types/user.interface";


type TypeRegisterUser = (registrationData: IRegistrationData) => Promise<string|null>
const registerUser: TypeRegisterUser = async (registrationData) => {

    // return token or null if any error (for example username or email is already taken)

    try {
        const response = await api.post('/auth/registration', registrationData)
        return response.data
    } catch(e) {
        return null
    }
}


type TypeLoginUser = (loginData: ILoginData) => Promise<string|null>
const loginUser: TypeLoginUser = async (loginData) => {

    // return token or null if credentials are wrong

    const data = JSON.stringify(
        `grant_type=&username=${loginData.email}&password=${loginData.password}&scope=&client_id=&client_secret=`
    )

    const requestConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }

    try {
        const response = await api.post('/auth/login', data, requestConfig)
        return response.data
    } catch(e) {
        return null
    }
}


export {
    registerUser,
    loginUser,
}
