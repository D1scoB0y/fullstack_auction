import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { IUser, IRegistrationData, ILoginData } from "@/types/user.interface";
import { registerUser, loginUser } from "@/service/userService";


interface IAuthStore {
    isAuthenticated: boolean;
    user: null | IUser;
    login: (loginData: ILoginData) => Promise<void>;
    registration: (registrationData: IRegistrationData) => Promise<void>;
    logout: () => void;
  }


const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            
            isAuthenticated: false,
            user: null,

            login: async (loginData) => {

                const user = await loginUser(loginData)

                if (user) {
                    set(state => ({
                        ...state,
                        isAuthenticated: true,
                        user: user,
                    }))
                }
                
            },

            registration: async (registrationData) => {

                const newUser = await registerUser(registrationData)

                if (newUser) {
                    set(state => ({
                        ...state,
                        isAuthenticated: true,
                        user: newUser,
                    }))
                }
            },

            logout: () => {
                set(state => ({
                    ...state,
                    isAuthenticated: false,
                    user: null
                }))
            }
        }),
        {
            name: 'auth'
        }
    )
)


export default useAuthStore
