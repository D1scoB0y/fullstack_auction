import { Dispatch, SetStateAction } from "react"


interface IFormData {
    email: string
    password: string
}

interface IFormErrors extends IFormData {}


const useLoginFormHandlers = (
    setFormData: Dispatch<SetStateAction<IFormData>>,
    setErrors: Dispatch<SetStateAction<IFormErrors>>,
) => {
    
    return {
        emailHandler: (email: string) => {

            setFormData(prev => ({...prev, email: email}))

            if (email.length === 0) {
                setErrors(prev => ({...prev, email: 'Заполните это поле'}))
                return
            }

            setErrors(prev => ({...prev, email: ''}))
        },

        passwordHandler: (password: string) => {

            setFormData(prev => ({...prev, password: password}))

            if (password.length === 0) {
                setErrors(prev => ({...prev, password: 'Заполните это поле'}))
                return
            }

            setErrors(prev => ({...prev, password: ''}))
        }
    }
}


export default useLoginFormHandlers

export type {
    IFormData,
    IFormErrors,
}
