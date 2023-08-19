import api from "@/utils/api";


type TypeCheckValue = (value: string) => Promise<boolean>


const checkEmail: TypeCheckValue = async (email) => {
    try {
        await api.get('/auth/is-unique/email', {params: {email}})
        return true
    } catch(e) {
        return false
    }
}


const checkUsername: TypeCheckValue = async (username) => {
    try {
        await api.get('/auth/is-unique/username', {params: {username}})
        return true
    } catch(e) {
        return false
    }
}


const checkPhone: TypeCheckValue = async (phone_number) => {
    try {
        await api.get('/auth/is-unique/phone', {params: {phone_number}})
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
