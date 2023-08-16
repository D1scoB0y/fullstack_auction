import { create } from "zustand";


type TypeChangeState = (value: boolean) => void

interface IModalsStore {
    loginModalActive: boolean
    registrationModalActive: boolean
    emailWarningModalActive: boolean
    phoneVerificationModalActive: boolean
    changePasswordModalActive: boolean
    resetPasswordModalActive: boolean

    setLoginModalActive: TypeChangeState
    setRegistrationModalActive: TypeChangeState
    setEmailWarningModalActive: TypeChangeState
    setPhoneVerificationModalActive: TypeChangeState
    setChangePasswordModalActive: TypeChangeState
    setResetPasswordModalActive: TypeChangeState
}


const useModalsStore = create<IModalsStore>(
    
        (set) => ({
            loginModalActive: false,
            registrationModalActive: false,
            emailWarningModalActive: false,
            phoneVerificationModalActive: false,
            changePasswordModalActive: false,
            resetPasswordModalActive: false,


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
            },

            setResetPasswordModalActive: (value) => {
                set(state => ({
                    ...state,
                    resetPasswordModalActive: value
                }))
            },
        }
    )
)


export default useModalsStore
