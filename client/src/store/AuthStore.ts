import { create } from "zustand";
import { persist } from 'zustand/middleware'

import { IUser } from "@/types/UserTypes";



interface IAuthStore {
    isAuthenticated: boolean;
    user: null | IUser;
    token: null | string;
    login: (email: string, password: string) => Promise<void>;
    registration: (username: string, email: string, phone_number: string, password: string) => Promise<void>;
    logout: () => void;
  }


const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            
            isAuthenticated: false,
            user: null,
            token: null,
            login: async (email, password) => {
                set(state => ({

                }))
            },
            registration: async (userInfo) => {

            },
            logout: () => {

            }

        }),
        {
            name: 'auth'
        }
    )
)


export default useAuthStore

