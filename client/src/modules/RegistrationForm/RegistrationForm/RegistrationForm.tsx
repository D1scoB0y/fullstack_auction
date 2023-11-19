import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleButton from '../../../components/GoogleButton/GoogleButton'
import Line from '../../../UI/Line/Line'
import ErrorBox from '../../../UI/ErrorBox/ErrorBox'
import Input from '../../../UI/Input/Input'
import PasswordField from '../../../UI/PasswordField/PasswordField'
import Button from '../../../UI/Button/Button'
import validateUsername from '../../../validators/usernameValidator'
import validateEmail from '../../../validators/emailValidator'
import validatePassword from '../../../validators/passwordValidator'
import { useUserContext } from '../../../context/UserContext'
import { useSnackbarContext } from '../../../context/SnackbarContext'
import { decodeBase64 } from '../../../helpers/decodeBase64'
import SignInHint from '../components/SignInHint/SignInHint'
import Form from '../../../UI/Form/Form'


interface FormData {
    username: string
    email: string
    password: string
}

interface Errors {
    username: string
    email: string
    password: string
    afterSubmitError: string
}

interface DirtyFields {
    username: boolean
    email: boolean
    password: boolean
}

const initialFormData = {
    username: '',
    email: '',
    password: '',
}

const initialDirtyFields = {
    username: false,
    email: false,
    password: false,
}

const initialErrors = {
    username: 'Придумайте имя пользователя',
    email: 'Введите вашу почту',
    password: 'Введите пароль',
    afterSubmitError: '',
}

const RegistrationForm = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [dirtyFields, setDirtyFields] = useState<DirtyFields>(initialDirtyFields)
    const [errors, setErrors] = useState<Errors>(initialErrors)
    const [isValid, setIsValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const { registration } = useUserContext()
    const { showSnackbar } = useSnackbarContext()

    useEffect(() => {
        for (const errorIndex in errors) {
            if (errors[errorIndex as keyof object]) {
                setIsValid(false)
                return
            }
        }
        setIsValid(true)
    }, [errors])

    const handleUsername = (username: string) => {
        setFormData(prev => ({
            ...prev,
            username,
        }))
        setDirtyFields(prev => ({
            ...prev,
            username: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))

        const error = validateUsername(username)

        setErrors(prev => ({
            ...prev,
            username: error,
        }))
    }

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

        const error = validateEmail(email)

        setErrors(prev => ({
            ...prev,
            email: error,
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

        const error = validatePassword(password)

        setErrors(prev => ({
            ...prev,
            password: error
        }))
    }

    const handleSubmit = async () => {
        const res = await registration({
            username: formData.username,
            email: formData.email,
            password: formData.password,
        })

        if (res.success) {
            navigate('/')
        } else {
            if (res.errorPresentation) {
                const decodedError = decodeBase64(res.errorPresentation)

                setErrors(prev => ({
                    ...prev,
                    afterSubmitError: decodedError,
                }))
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
            <GoogleButton
                setIsLoading={setIsLoading}
                setErrors={setErrors}
            />
            <Line />
            <ErrorBox errors={{
                username: dirtyFields.username && errors.username,
                email: dirtyFields.email && errors.email,
                password: dirtyFields.password && errors.password,
                afterSubmitError: errors.afterSubmitError
            }} />
            <Input
                value={formData.username}
                onChange={handleUsername}
                placeholder="Имя пользователя"
                maxLength={16}
            />
            <Input
                value={formData.email}
                onChange={handleEmail}
                placeholder="Электронная почта"
                type="email"
                style={{marginTop: 32}}
            />
            <PasswordField
                value={formData.password}
                onChange={handlePassword}
                style={{marginTop: 32}}
            />
            <Button
                text="Создать аккуант"
                disabled={!isValid}
                isLoading={isLoading}
                style={{marginTop: 32}}
            />
            <SignInHint />
        </Form>
    )
}

export { RegistrationForm }
