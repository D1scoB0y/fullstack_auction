import api from "@/api";
import { TypeRegistration } from "@/types/UserTypes";


const registration: TypeRegistration = async (username, email, phone_number, password) => {
    const response = await api.post('/registration', {username, email, phone_number, password})

    if (response.status === 200) {
        return response.data
    }
}


