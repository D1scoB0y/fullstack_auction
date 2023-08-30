import { create } from "zustand";


type TypeChangeState = (value: boolean) => void

interface IModalsStore {
    loginModalActive: boolean
    registrationModalActive: boolean
    changePasswordModalActive: boolean
    resetPasswordModalActive: boolean

    setLoginModalActive: TypeChangeState
    setRegistrationModalActive: TypeChangeState
    setChangePasswordModalActive: TypeChangeState
    setResetPasswordModalActive: TypeChangeState
}


const useModalsStore = create<IModalsStore>(
    
        (set) => ({
            loginModalActive: false,
            registrationModalActive: false,
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
