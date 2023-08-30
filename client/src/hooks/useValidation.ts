import { useEffect, useState } from "react"


export interface IValidations {
    required?: boolean

    minLength?: number

    minNumber?: number
    maxNumber?: number

    onlyNumbers?: boolean

    avoidSpecialSymbols?: boolean

    isEmail?: boolean

    isPhoneNumber?: boolean
}

type TypeUseValidation = (value: string, validations: IValidations) => string

const useValidation: TypeUseValidation = (value, validations) => {

    const [error, setError] = useState<string>('')
    
    const validate = () => {
        for (const validation in validations) {

            switch (validation) {

                case 'required':
                    if (!value) {
                        setError('Заполните это поле')
                        return
                    }
                    break

                case 'minLength':
                    // @ts-ignore
                    if (value.length < validations[validation]) {
                        setError(`Минимальная длина ${validations[validation]} символов`)
                        return
                    }
                    break
                
                case 'minNumber':
                    // @ts-ignore
                    if (Number(value) < validations[validation]) {
                        setError(`Минимальное значение: ${validations[validation]}`)
                        return
                    }
                    break
                
                case 'maxNumber':
                    // @ts-ignore
                    if (Number(value) > validations[validation]) {
                        setError(`Максимальное значение: ${validations[validation]}`)
                        return
                    }
                    break

                case 'onlyNumbers':
                    const numbers = '1234567890'
                    for (const symbol of value) {
                        if (numbers.indexOf(symbol) === -1) {
                            setError('Только цифры')
                            return
                        }
                    }
                    break
                
                case 'avoidSpecialSymbols':
                    const specialSymbols = '~`!@#$%^&*()[]{}<>+-=:"?/.,;\'\"\\'

                    for (const symbol of value) {

                        if (specialSymbols.indexOf(symbol) !== -1) {
        
                            setError('Только буквы, цифры и подчеркивание')
                            return
                        }
                    }
                    break

                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if (!re.test(value)) {
                        setError('Введите корректную почту')
                        return
                    }
                    break

                case 'isPhoneNumber':
                    
                    if (value.length > 0 && value.indexOf('+') !== 0) {
                        setError('Номер должен ничинаться с "+"')
                        return
                    }

                    if (value.length > 0 && value.length < 12) {
                        setError('Введите корректный номер')
                        return
                    }
        
                    const availableSymbols = '+1234567890'
        
                    for (const symbol of value) {
                        if (availableSymbols.indexOf(symbol) === -1) {
                            setError('Допускаются только цифры и "+"')
                            return
                        }
                    }
                    break
            }
        }
        setError('')
    }


    useEffect(() => {
        validate()
    }, [value])


    return error
}


export default useValidation
