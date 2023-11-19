import { useState } from "react"
import Form from "../../../UI/Form/Form"
import validateEmail from "../../../validators/emailValidator"
import ErrorBox from "../../../UI/ErrorBox/ErrorBox"
import Input from "../../../UI/Input/Input"
import Button from "../../../UI/Button/Button"
import requestPasswordReset from "../api/requestPasswordReset"
import { useSnackbarContext } from "../../../context/SnackbarContext"
import RequestTimer from "../components/RequestTimer/RequestTimer"
import FormHint from "../../../UI/FormHint/FormHint"


const EmailForm = () => {
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [emailDirty, setEmailDirty] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)

    const { showSnackbar } = useSnackbarContext()

    const handleEmail = (email: string) => {
        setEmail(email)
        setEmailDirty(true)

        const error = validateEmail(email)

        setEmailError(error)
    }
 
    const handleSubmit = async () => {
        const res = await requestPasswordReset(email)

        if (res.success) {
            showSnackbar('success', 'Письмо отправлено!')
            setTimer(60)
        } else {
            if (res.statusCode === 404) {
                setEmailError('Почта не найдена')
            } else if (res.statusCode === 429) {
                setEmailError('Слишком много запросов')
            } else {
                showSnackbar('fail', 'Ошибка, попробуйте позже')
            }
        }
    }

    return (
        <Form
            onSubmit={handleSubmit}
            setIsLoading={setIsLoading}
        >
            <FormHint
                text="Укажите электронную почту и мы вышлем инструкции по сбросу пароля."
            />
            <ErrorBox errors={{
                email: emailDirty && emailError,
            }} />
            <Input
                value={email}
                placeholder="Электронная почта"
                onChange={handleEmail}
                type="email"
            />
            <Button
                text="Далее"
                disabled={!!emailError || !!timer}
                isLoading={isLoading}
                style={{ marginTop: 32 }}
            />
            <RequestTimer
                timer={timer}
                setTimer={setTimer}
            />
        </Form>
    )
}

export { EmailForm }
