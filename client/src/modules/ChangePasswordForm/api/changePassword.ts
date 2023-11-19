import client from "../../../api/client"

const changePassword = async (
    newPassword: string,
    currentPassword: string,
    token: string,
): Promise<boolean> => {
    const json = {
        newPassword,
        currentPassword,
    }

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    try {
        await client.patch('auth/password', { json, headers })
        return true
    } catch (e) {
        return false
    }
}

export default changePassword
