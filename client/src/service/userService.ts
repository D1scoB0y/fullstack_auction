import api from "@/api";


type TypeCreateUser = (username: string, email: string, password: string) => Promise<void>


const createUser: TypeCreateUser = async (username, email, password) => {
    const response = await api.post('/registration', {username, email, password})

    if (response.status === 200) {
        return response.data
    }
}


