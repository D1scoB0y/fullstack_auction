import client from "../../../api/client"


const validatePhoneVerificationCode = async (token: string, code: string): Promise<boolean> => {
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    try {
        await client.get('auth/validate-phone-verification-code', {
            headers,
            searchParams: { code },
        })
        return true
    } catch (e) {
        return false
    }
}

export default validatePhoneVerificationCode
