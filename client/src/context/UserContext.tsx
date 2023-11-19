import { FC, createContext, useCallback, useContext, useEffect, useState } from 'react'
import UserService from '../api/UserService'
import type { User, GetToken, CreateUser } from '../types/user'


export interface IUserContext {
    user: User | null
    token: string | null
    updateUserState: () => Promise<void>
    registration: (registrationData: CreateUser) => Promise<{
        success: boolean,
        token: string | null,
        errorPresentation: string
    }>
    login: (loginData: GetToken) => Promise<boolean>
    loginWithGoogle: (accessToken: string) => Promise<boolean>
    logout: () => void
}

const UserContext = createContext<IUserContext | null>(null)

const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [user, setUser] = useState<User | null>(null)

    const updateUserState = useCallback(async () => {
        if (token) {
            const user = await UserService.getUser(token)

            if (user) {
                setUser(user)
            }
        }
    }, [token])

    useEffect(() => {
        updateUserState()
    }, [])

    useEffect(() => {
        (async () => {
            if (token) {
                const user = await UserService.getUser(token)

                if (user) {
                    setUser(user)
                } else {
                    setToken(null)
                }
            }

            localStorage.setItem('token', token || '')
        })()
    }, [token])

    const registration = async (registrationData: CreateUser) => {
        const res = await UserService.createUser(registrationData)

        if (res.success) {
            setToken(res.token)
        }

        return res
    }

    const login = async (loginData: GetToken) => {
        const token = await UserService.getToken(loginData)

        if (token) {
            setToken(token)
            return true
        }

        return false
    }

    const loginWithGoogle = async (accessToken: string) => {
        const token = await UserService.getTokenWithGoogle(accessToken)

        if (token) {
            setToken(token)
            return true
        }

        return false
    }

    const logout = () => {
        setToken(null)
        setUser(null)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                updateUserState,
                registration,
                login,
                loginWithGoogle,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => useContext(UserContext) as IUserContext

export {
    UserContext,
    UserProvider,
    useUserContext,
}
