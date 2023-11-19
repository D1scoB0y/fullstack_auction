import { HTTPError } from "ky"
import { UpdateUser } from "../../../types/user"
import client from "../../../api/client"


const updateUser = async (
    data: UpdateUser,
    token: string,
) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    try {
        await client.put('auth/users', { json: data, headers })
        return {
            success: true,
            errorPresentation: null,
        }
    } catch (err) {
        if (err instanceof HTTPError) {
            if (err.response.status === 409) {
                return {
                    success: false,
                    errorPresentation: err.response.headers.get('error-presentation'),
                }
            }
        }
        return {
            success: false,
            errorPresentation: null,
        }
    }
}

export default updateUser
