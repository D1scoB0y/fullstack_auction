import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { IUser, IRegistrationData, ILoginData } from "@/types/user.interface";
import { registerUser, loginUser } from "@/service/userService";


interface IAuthStore {
    token: string|null,
    isAuthenticated: boolean;
    login: (loginData: ILoginData) => Promise<void|null>;
    registration: (registrationData: IRegistrationData) => Promise<void>;
    logout: () => void;
}


const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,
            login: async (loginData) => {
                const token = await loginUser(loginData)

                if (token) {
                    set(state => ({
                        ...state,
                        token: token,
                        isAuthenticated: true,
                    }))
                } else {
                    return null
                }
            },
            registration: async (registrationData) => {
                const token = await registerUser(registrationData)

                if (token) {
                    set(state => ({
                        ...state,
                        token: token,
                        isAuthenticated: true,
                    }))
                }
            },
            logout: () => {
                set(state => ({
                    ...state,
                    token: null,
                    isAuthenticated: false,
                }))
            }
        }),
        {
            name: 'auth'
        }
    )
)


export default useAuthStore
