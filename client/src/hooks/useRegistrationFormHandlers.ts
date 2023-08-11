import { Dispatch, SetStateAction } from "react"


interface IFormData {
    username: string
    email: string
    password: string
}

interface IFormErrors extends IFormData {}


const useRegistrationFormHandlers = (
    setFormData: Dispatch<SetStateAction<IFormData>>,
    setErrors: Dispatch<SetStateAction<IFormErrors>>,
) => {
    
    return {
        usernameHandler: (username: string) => {

            setFormData(prev => ({...prev, username: username}))
        
            if (username.length === 0) {
                setErrors(prev => ({...prev, username: 'Заполните это поле'}))
                return
            }
            
            if (username.length < 3) {
                setErrors(prev => ({...prev, username: 'Длина от 3 до 20 символов'}))
                return
            }
            
            const badSymbols = '~`!@#$%^&*()[]{}<>+-=:"?/.,;\'\"\\'

            for (const symbol of badSymbols) {

                if (username.indexOf(symbol) !== -1) {

                    setErrors(prev => ({...prev, username: 'Только буквы, цифры и подчеркивание'}))
                    return
                }
            }

            setErrors(prev => ({...prev, username: ''}))
        },

        emailHandler: (email: string) => {

            setFormData(prev => ({...prev, email: email}))

            if (email.length === 0) {
                setErrors(prev => ({...prev, email: 'Заполните это поле'}))
                return
            }

            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!re.test(email)) {
                setErrors(prev => ({...prev, email: 'Введите корректную почту'}))
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

            if (password.length < 8) {
                setErrors(prev => ({...prev, password: 'Минимальная длина 8 символов'}))
                return
            }

            setErrors(prev => ({...prev, password: ''}))
        }
    }
}


export default useRegistrationFormHandlers

export type {
    IFormData,
    IFormErrors,
}
