import { FC, createContext, useCallback, useEffect, useState } from "react";
import { getUser } from "@/services/userServices/helperService";
import { ILoginData, IRegistrationData } from "@/types/user.interface";
import { loginUser, registerUser, loginUserWithGoogle } from "@/services/userServices/authService";

import { IUser } from "@/types/user.interface";


export interface IUserContext {
    user: IUser|null
    token: string|null
    updateUserState: () => Promise<void>
    registration: (registrationData: IRegistrationData) => Promise<boolean>
    login: (loginData: ILoginData) => Promise<boolean>
    loginWithGoogle: (googleToken: string) => Promise<boolean>
    logout: () => void
}

const UserContext = createContext<IUserContext|null>(null) 

const UserProvider: FC<{children: React.ReactNode}> = ({ 
    children,
}) => {

    const [token, setToken] = useState<string|null>(localStorage.getItem('token'))
    const [user, setUser] = useState<IUser|null>(null)


    const updateUserState = useCallback(async () => {
        if (token) {

            const user = await getUser(token)

            if (user) {
                setUser(user)
            }
        }
    }, [token])


    useEffect(() => {
        updateUserState()
    }, [])

    useEffect(() => {

        const checkToken = async () => {

            if (token) {

                const user = await getUser(token)

                if (user) {
                    setUser(user)
                } else {
                    setToken(null)
                }
            }

            localStorage.setItem('token', token || '')
        }

        checkToken()
    }, [token])


    const registration = async (registrationData: IRegistrationData) => {
        const token = await registerUser(registrationData)

        if (token) {
            setToken(token)
            return true
        }

        return false
    }

    const login = async (loginData: ILoginData) => {

        const token = await loginUser(loginData)

        if (token) {
            setToken(token)
            return true
        }

        return false
    }

    const loginWithGoogle = async (googleToken: string) => {
        
        const token = await loginUserWithGoogle(googleToken)

        if (token) {
            setToken(token)
            return true
        }

        return false
    }

    const logout = () => {
        setToken(null)
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


export {
    UserContext,
    UserProvider,
}
