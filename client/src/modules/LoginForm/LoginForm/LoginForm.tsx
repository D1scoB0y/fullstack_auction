import { useEffect, useState } from "react"
import Input from "../../../UI/Input/Input"
import PasswordField from "../../../UI/PasswordField/PasswordField"
import Button from "../../../UI/Button/Button"
import { useUserContext } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom"
import ResetPasswordButton from "../componets/ResetPasswordButton/ResetPasswordButton"
import CreateAccountHint from "../componets/CreateAccountHint/CreateAccountHint"
import ErrorBox from "../../../UI/ErrorBox/ErrorBox"
import Line from "../../../UI/Line/Line"
import GoogleButton from "../../../components/GoogleButton/GoogleButton"
import Form from "../../../UI/Form/Form"


interface FormData {
    email: string
    password: string
}

interface DirtyFields {
    email: boolean
    password: boolean
}

interface Errors {
    email: string
    password: string
    afterSubmitError: string
}

const initialFormData = {
    email: '',
    password: '',
}

const initialDirtyFields = {
    email: false,
    password: false,
}

const initialErrors = {
    email: 'Введите электронную почту',
    password: 'Введите пароль',
    afterSubmitError: '',
}


const LoginForm = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [dirtyFields, setDirtyFields] = useState<DirtyFields>(initialDirtyFields)
    const [errors, setErrors] = useState<Errors>(initialErrors)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isValid, setIsValid] = useState<boolean>(false)

    const { login } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        for (const errorIndex in errors) {
            if (errors[errorIndex as keyof object]) {
                setIsValid(false)
                return
            }
        }
        setIsValid(true)
    }, [errors])

    const handleEmail = (email: string) => {
        setFormData(prev => ({
            ...prev,
            email,
        }))
        setDirtyFields(prev => ({
            ...prev,
            email: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))

        if (!email) {
            setErrors(prev => ({
                ...prev,
                email: 'Введите электронную почту',
            }))
        }

        setErrors(prev => ({
            ...prev,
            email: '',
        }))
    }

    const handlePassword = (password: string) => {
        setFormData(prev => ({
            ...prev,
            password,
        }))
        setDirtyFields(prev => ({
            ...prev,
            password: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))

        if (!password) {
            setErrors(prev => ({
                ...prev,
                password: 'Введите пароль',
            }))
        }

        setErrors(prev => ({
            ...prev,
            password: '',
        }))
    }

    const handleSubmit = async () => {
        const isLogined = await login({
            email: formData.email,
            password: formData.password,
        })

        if (isLogined) {
            navigate('/')
        } else {
            setErrors(prev => ({
                ...prev,
                afterSubmitError: 'Неверный логин или пароль'
            }))
        }
    }

    return (
        <Form
            onSubmit={handleSubmit}
            setIsLoading={setIsLoading}
        >
            <GoogleButton
                setIsLoading={setIsLoading}
                setErrors={setErrors}
            />
            <Line />
            <ErrorBox errors={{
                email: dirtyFields.email && errors.email,
                password: dirtyFields.password && errors.password,
                afterSubmitError: errors.afterSubmitError,
            }} />
            <Input
                value={formData.email}
                onChange={handleEmail}
                placeholder="Электронная почта"
                type="email"
            />
            <PasswordField
                value={formData.password}
                onChange={handlePassword}
                style={{marginTop: 32}}
            />
            <Button
                text="Войти"
                disabled={!isValid}
                isLoading={isLoading}
                style={{marginTop: 32}}
            />
            <ResetPasswordButton />
            <CreateAccountHint />
        </Form>
    )
}

export { LoginForm }
