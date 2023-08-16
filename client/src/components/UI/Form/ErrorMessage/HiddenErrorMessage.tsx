import { FC, memo } from 'react'

import ErrorMessage, { IErrorMessageProps } from "./ErrorMessage";


const HiddenErrorMessage: FC<IErrorMessageProps> = ({
    errorText
}) => {
    if (errorText) {
        return (
            <ErrorMessage errorText={errorText} />
        )
    }
}


export default memo(HiddenErrorMessage)
