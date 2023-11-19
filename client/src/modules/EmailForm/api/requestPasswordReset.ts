import { HTTPError } from "ky"
import client from "../../../api/client"


interface RequestPasswordResetReturns {
    success: boolean
    statusCode: number
}

const requestPasswordReset = async (
    email: string,
): Promise<RequestPasswordResetReturns> => {
    try {
        await client.get('auth/reset-password', {
            searchParams: { email },
        })
        return {
            success: true,
            statusCode: 0,
        }
    } catch (err) {
        if (err instanceof HTTPError) {
            return {
                success: false,
                statusCode: err.response.status,
            }
        }
        return {
            success: false,
            statusCode: 0,
        }
    }
}

export default requestPasswordReset
