import { HTTPError } from 'ky'
import type {
    User,
    CreateUser,
    GetToken,
} from '../types/user'
import client from './client'


const UserService = {
    createUser: async (data: CreateUser) => {
        try {
            const res = await client.post('auth/users', { json: data }).json()
            return {
                success: true,
                errorPresentation: '',
                token: res as string,
            }
        } catch (err) {
            if (err instanceof HTTPError) {
                if (err.response.status === 409) {
                    return {
                        success: false,
                        errorPresentation: err.response.headers.get('error-presentation') || '',
                        token: null,
                    }
                }
            }
            return {
                success: false,
                errorPresentation: '',
                token: null,
            }
        }
    },
    getToken: async (data: GetToken): Promise<string | null> => {
        try {
            const res = await client.post('auth/token', { json: data }).json()
            return res as string
        } catch (e) {
            return null
        }
    },
    getTokenWithGoogle: async (token: string): Promise<string | null> => {
        try {
            const res = await client.post('auth/google', { json: { token } }).json()
            return res as string
        } catch (e) {
            return null
        }
    },
    getUser: async (token: string): Promise<User | null> => {
        const requestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            const res = await client.get('auth/users', requestConfig).json()
            return res as User
        } catch (e) {
            return null
        }
    },
    changePassword: async (
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
    },
    validatePhoneVerificationCode: async (token: string, code: string): Promise<boolean> => {
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
    },
}

export default UserService
