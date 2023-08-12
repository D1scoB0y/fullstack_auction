import { FC, createContext, useEffect, useState } from "react";
import { getUser } from "@/services/userServices/helperService";
import { ILoginData, IRegistrationData } from "@/types/user.interface";
import { loginUser, registerUser } from "@/services/userServices/authService";


export interface IUserContext {
    token: string|null
    registration: (registrationData: IRegistrationData) => Promise<boolean>
    login: (loginData: ILoginData) => Promise<boolean>
    logout: () => void
}

const UserContext = createContext<IUserContext|null>(null) 

const UserProvider: FC<{children: React.ReactNode}> = ({ 
    children,
}) => {
    const [token, setToken] = useState<string|null>(localStorage.getItem('token'))

    useEffect(() => {

        const getUserEffect = async () => {

            if (token) {

                const user = await getUser(token)

                if (!user) {
                    setToken(null)
                }
            }

            localStorage.setItem('token', token || '')
        }

        getUserEffect()
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

    const logout = () => {
        setToken(null)
    }

    return (
        <UserContext.Provider
            value={{
                token,
                registration,
                login,
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

