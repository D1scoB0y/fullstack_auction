import api from "@/api";
import { IUser } from "@/types/user.interface";


type TypeGetUser = (token: string) => Promise<IUser|null>
const getUser: TypeGetUser = async (token) => {

    // returns user or null if token is invalid

    const requestConfig = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    try{
        const response = await api.get('/auth/get-user', requestConfig)
        return response.data
    } catch(e) {
        return null
    }
}


export {
    getUser
}
