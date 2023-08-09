import { Dispatch, SetStateAction } from "react"


interface IFormData {
    username: string
    email: string
    phoneNumber: string|null
    password: string
}

interface IFormErrors extends IFormData {
    phoneNumber: string
}


const useSettingsFormHandlers = (
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

        phoneNumberHandler: (phoneNumber: string) => {

            setFormData(prev => ({...prev, phoneNumber: phoneNumber}))

            if (phoneNumber.length > 0 && phoneNumber.indexOf('+') === -1) {
                setErrors(prev => ({...prev, phoneNumber: 'Номер должен начинаться с "+"'}))
                return
            }

            if (phoneNumber.length > 0 && phoneNumber.length < 12) {
                setErrors(prev => ({...prev, phoneNumber: 'Введите корректный номер'}))
                return
            }

            const availableSymbols = '+1234567890'

            for (const symbol of phoneNumber) {
                if (availableSymbols.indexOf(symbol) === -1) {
                    setErrors(prev => ({...prev, phoneNumber: 'Допускаются только цифры и "+"'}))
                    return
                }
            }

            setErrors(prev => ({...prev, phoneNumber: ''}))
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


export default useSettingsFormHandlers

export type {
    IFormData,
    IFormErrors,
}
