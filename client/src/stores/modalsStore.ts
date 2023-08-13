import { create } from "zustand";


interface IModalsStore {
    loginModalActive: boolean
    registrationModalActive: boolean
    emailWarningModalActive: boolean
    phoneVerificationModalActive: boolean
    changePasswordModalActive: boolean

    setLoginModalActive: (value: boolean) => void
    setRegistrationModalActive: (value: boolean) => void
    setEmailWarningModalActive: (value: boolean) => void
    setPhoneVerificationModalActive: (value: boolean) => void
    setChangePasswordModalActive: (value: boolean) => void
}


const useModalsStore = create<IModalsStore>(
    
        (set) => ({
            loginModalActive: false,
            registrationModalActive: false,
            emailWarningModalActive: false,
            phoneVerificationModalActive: false,
            changePasswordModalActive: false,


            setLoginModalActive: (value: boolean) => {
                set(state => ({
                    ...state,
                    loginModalActive: value
                }))
            },

            setRegistrationModalActive: (value) => {
                set(state => ({
                    ...state,
                    registrationModalActive: value
                }))
            },

            setEmailWarningModalActive: (value) => {
                set(state => ({
                    ...state,
                    emailWarningModalActive: value
                }))
            },

            setPhoneVerificationModalActive: (value) => {
                set(state => ({
                    ...state,
                    phoneVerificationModalActive: value
                }))
            },

            setChangePasswordModalActive: (value) => {
                set(state => ({
                    ...state,
                    changePasswordModalActive: value
                }))
            }
        }
    )
)


export default useModalsStore
