import api from "@/api"


const checkUsernameIsFree = async (username: string) => {
    try {
        await api.get('/auth/check-username', {params: {username}})
    } catch(e) {
        return 'Имя пользователя уже занято'
    }
}

const checkEmailIsFree = async (email: string) => {
    try {
        await api.get('/auth/check-email', {params: {email}})
    } catch(e) {
        return 'Эта почта уже занята'
    }
}


export {
    checkUsernameIsFree,
    checkEmailIsFree,
}
