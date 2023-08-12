import api from "@/api"

type TypeEmailVerificationRequest = (token: string|null) => Promise<void>
const emailVerificationRequest: TypeEmailVerificationRequest = async (token) => {

    if (token) {
        const requestConfig = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        try {
            await api.get('/auth/mail/verification-message-request', requestConfig)
        } catch (e) {}
    }
}


type TypeIsEmailTokenValid = (emailToken: string) => Promise<boolean>
const isEmailTokenValid: TypeIsEmailTokenValid = async (emailToken) => {

    const requestConfig = {
        params: {
            token: emailToken
        }
    }

    try {
        await api.get('/auth/mail/validate-verification-token', requestConfig)
        return true
    } catch (e) {
        return false
    }
}


export {
    emailVerificationRequest,
    isEmailTokenValid,
}
