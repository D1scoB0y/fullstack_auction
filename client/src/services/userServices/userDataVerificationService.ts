import api from "@/utils/api";


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


type TypeRequestPhoneCall = (token: string|null) => Promise<void>
const requestPhoneCall: TypeRequestPhoneCall = async (token) => {

    if (token) {
        
        const requestConfig = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        try {
            await api.get('/auth/mobile/verification-call-request', requestConfig)
        } catch (e) {}
    }
}


type TypeIsPhoneCodeValid = (token: string|null, code: string) => Promise<boolean>
const isPhoneCodeValid: TypeIsPhoneCodeValid = async (token, code) => {

    if (token) {
        const requestConfig = {
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                verif_code: code
            }
        }

        try {
            await api.get('/auth/mobile/validate-verification-code', requestConfig)
            return true
        } catch (e) {
            return false
        }
    }
    return false
}


export {
    emailVerificationRequest,
    isEmailTokenValid,
    requestPhoneCall,
    isPhoneCodeValid,
}
