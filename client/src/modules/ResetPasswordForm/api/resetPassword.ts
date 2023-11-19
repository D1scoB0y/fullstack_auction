import client from "../../../api/client"

const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    const json = {
        token,
        newPassword,
    }

    try {
        await client.patch('auth/reset-password', { json })
        return true
    } catch (e) {
        return false
    }
}

export default resetPassword
