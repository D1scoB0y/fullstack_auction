import api from "@/api"


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


type TypeCheckPhone = (phone_number: string) => Promise<boolean>
const checkPhone: TypeCheckPhone = async (phone_number) => {
    try {
        await api.get('/auth/check-phone', {params: {phone_number}})
        return true
    } catch(e) {
        return false
    }
}


export {
    checkEmail,
    checkUsername,
    checkPhone,
}
