import client from "../../api/client"


const validateEmailVerificationToken = async (token: string): Promise<boolean> => {
    try {
        await client.get('auth/validate-email-verification-token', {
            searchParams: { token },
        })
        return true
    } catch (e) {
        return false
    }
}

export default validateEmailVerificationToken
