import { useState } from "react"
import Form from "../../../UI/Form/Form"
import Input from "../../../UI/Input/Input"
import Button from "../../../UI/Button/Button"
import { useNavigate } from "react-router-dom"
import ErrorBox from "../../../UI/ErrorBox/ErrorBox"
import validateCode from "../validators/codeValidator"
import validatePhoneVerificationCode from "../api/validatePhoneVerificationCode"
import { useUserContext } from "../../../context/UserContext"
import { useSnackbarContext } from "../../../context/SnackbarContext"


const PhoneVerificationForm = () => {
    const [code, setCode] = useState<string>('')
    const [error, setError] = useState<string>('Введите код')
    const [dirty, setDirty] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const {
        token,
        updateUserState,
    } = useUserContext()

    const {
        showSnackbar,
    } = useSnackbarContext()

    const handleCode = (code: string) => {
        const allowedSymbols = '1234567890'
        if (!allowedSymbols.includes(code[code.length - 1])) return

        setCode(code)
        setDirty(true)
        setError('')

        const error = validateCode(code)

        setError(error)
    }

    const handleSubmit = async () => {
        const isSuccess = await validatePhoneVerificationCode(token as string, code)

        if (isSuccess) {
            showSnackbar('success', 'Номер телефона подтвержден!')
            updateUserState()
            navigate('/settings')
        } else {
            setError('Код недействителен')
        }
    }

    return (
        <Form
            onSubmit={handleSubmit}
            setIsLoading={setIsLoading}
            style={{ marginTop: 32 }}
        >
            <ErrorBox
                errors={{
                    code: dirty && error,
                }}
            />
            <Input
                value={code}
                onChange={handleCode}
                placeholder="Код"
                style={{ marginTop: 32 }}
                maxLength={4}
            />
            <Button
                text="Подтвердить"
                disabled={!!error}
                isLoading={isLoading}
                style={{ marginTop: 32 }}
            />
        </Form>
    )
}

export { PhoneVerificationForm }
