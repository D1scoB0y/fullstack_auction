import { create } from "zustand";


interface IModalsStore {
    loginModalActive: boolean
    registrationModalActive: boolean
    setLoginModalActive: (value: boolean) => void
    setRegistrationModalActive: (value: boolean) => void
}

const useModalsStore = create<IModalsStore>()(
    
        (set) => ({
            loginModalActive: false,
            registrationModalActive: false,
            
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
            }
        }
    )
)


export default useModalsStore
