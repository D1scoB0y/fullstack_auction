import { useState, useEffect, Dispatch, SetStateAction } from "react"

import useValidation, { IValidations } from "./useValidation"


export interface IUseInputReturns {
    value: string,
    isChanged: boolean,
    isValid: boolean,
    setValue: Dispatch<SetStateAction<string>>,
    onChange: (value: string) => void,
    clearField: () => void,
    error: string,
}

type TypeUseInput = (initialValue: string, validations: IValidations) => IUseInputReturns


const useInput: TypeUseInput = (initialValue, validations) => {
    
    const [value, setValue] = useState<string>(initialValue)
    const [isValid, setIsValid] = useState<boolean>(!validations['required'])
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [isErrorCleared, setIsErrorCleared] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<string>('')

    const validationError = useValidation(value, validations)


    useEffect(() => {
        setIsValid(!validationError)

        if (isChanged) {
            setErrorState(validationError)
        }
    }, [validationError])


    const clearField = () => {
        setValue('')
        setIsErrorCleared(true)
    }

    const onChange = (newValue: string) => {
        setValue(newValue)
        setIsErrorCleared(false)
        setIsChanged(true)
    }

    const error = (isErrorCleared || !isChanged) ? '' : errorState

    return {
        value,
        isChanged,
        isValid,
        setValue,
        clearField,
        onChange,
        error,
    }
}


export default useInput
