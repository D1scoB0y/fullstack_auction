import client from "../../../api/client"

const requestPhoneVerification = async (token: string): Promise<boolean> => {
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    try {
        await client.get('auth/verification-call', { headers })
        return true
    } catch (e) {
        return false
    }
}

export default requestPhoneVerification
