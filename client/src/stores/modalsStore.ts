import { create } from "zustand";


interface IModalsStore {
    loginModalActive: boolean
    registrationModalActive: boolean
    emailWarningModalActive: boolean
    setLoginModalActive: (value: boolean) => void
    setRegistrationModalActive: (value: boolean) => void
    setEmailWarningModalActive: (value: boolean) => void
}


const useModalsStore = create<IModalsStore>()(
    
        (set) => ({
            loginModalActive: false,
            registrationModalActive: false,

            emailWarningModalActive: false,
            
            setLoginModalActive: (value: boolean) => {
                set(state => ({
                    ...state,
                    loginModalActive: value
                }))
            },
            setRegistrationModalActive: (value: boolean) => {
                set(state => ({
                    ...state,
                    registrationModalActive: value
                }))
            },
            setEmailWarningModalActive: (value: boolean) => {
                set(state => ({
                    ...state,
                    emailWarningModalActive: value
                }))
            }
        }
    )
)


export default useModalsStore
