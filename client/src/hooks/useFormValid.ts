import { useEffect, useState } from "react"

import { IUseInputReturns } from "./useInput"


type TypeUseFormValid = (
        afterSubmitErrors: any,
        ...fields: IUseInputReturns[]
    ) => boolean


const useFormValid: TypeUseFormValid = (
    afterSubmitErrors,
    ...fields
) => {

    const [isValid, setIsValid] = useState<boolean>(false)

    useEffect(() => {

        // Check afterSubmitErrors
        if (typeof afterSubmitErrors === 'string') {

            if (afterSubmitErrors) {
                setIsValid(false)
                return
            }

        } else {

            for (const errorIndex in afterSubmitErrors) {

                if (afterSubmitErrors[errorIndex]) {

                    setIsValid(false)
                    return
                }
            }
        }

        // Check fields
        for (const field of fields) {

            if (!field.isValid) {
                setIsValid(false)
                return
            }
        }

        setIsValid(true)

    }, [fields, afterSubmitErrors])

    
    return isValid
}


export default useFormValid
