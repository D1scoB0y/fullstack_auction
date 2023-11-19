import { FC, useState } from "react"
import Form from "../../../UI/Form/Form"
import Button from "../../../UI/Button/Button"
import PasswordField from "../../../UI/PasswordField/PasswordField"
import validatePassword from "../../../validators/passwordValidator"
import ErrorBox from "../../../UI/ErrorBox/ErrorBox"
import resetPassword from "../api/resetPassword"
import { useNavigate } from "react-router-dom"
import { useSnackbarContext } from "../../../context/SnackbarContext"
import FormHint from "../../../UI/FormHint/FormHint"


const ResetPasswordForm: FC<{ token: string | null }> = ({
    token,
}) => {
    if (!token) return <>404 Not Found</>

    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('Введите новый пароль')
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const { showSnackbar } = useSnackbarContext()

    const handlePassword = (password: string) => {
        setPassword(password)
        setPasswordDirty(true)

        const error = validatePassword(password)

        setPasswordError(error)
    }

    const handleSubmit = async () => {
        const isSuccess = await resetPassword(token, password)

        if (isSuccess) {
            navigate('/login')
        } else {
            showSnackbar('fail', 'Ошибка, попробуйте позже')
        }
    }

    return (
        <Form
            onSubmit={handleSubmit}
            setIsLoading={setIsLoading}
        >
            <FormHint
                text="Укажите новый пароль."
            />
            <ErrorBox
                errors={{
                    password: passwordDirty && passwordError,
                }}
            />
            <PasswordField
                value={password}
                onChange={handlePassword}
                placeholder="Новый пароль"
            />
            <Button
                text="Сохранить"
                style={{ marginTop: 32 }}
                disabled={!!passwordError}
                isLoading={isLoading}
            />
        </Form>
    )
}

export { ResetPasswordForm }
