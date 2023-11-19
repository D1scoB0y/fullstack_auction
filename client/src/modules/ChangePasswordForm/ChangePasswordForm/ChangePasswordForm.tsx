import { useEffect, useState } from "react"
import Form from "../../../UI/Form/Form"
import ErrorBox from "../../../UI/ErrorBox/ErrorBox"
import PasswordField from "../../../UI/PasswordField/PasswordField"
import Button from "../../../UI/Button/Button"
import validatePassword from "../../../validators/passwordValidator"
import changePassword from "../api/changePassword"
import { useUserContext } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom"
import { useSnackbarContext } from "../../../context/SnackbarContext"


interface FormData {
    newPassword: string
    currentPassword: string
}

interface DirtyFields {
    newPassword: boolean
    currentPassword: boolean
}

interface Errors {
    newPassword: string
    currentPassword: string
    afterSubmitError: string
}

const initialFormData = {
    newPassword: '',
    currentPassword: '',
}

const initialDirtyFields = {
    newPassword: false,
    currentPassword: false,
}

const initialErrors = {
    newPassword: 'Придумайте новый пароль',
    currentPassword: 'Введите текущий пароль',
    afterSubmitError: '',
}

const ChangePasswordForm = () => {
    const [formData, setFormDate] = useState<FormData>(initialFormData)
    const [dirtyFields, setDirtyFields] = useState<DirtyFields>(initialDirtyFields)
    const [errors, setErrors] = useState<Errors>(initialErrors)
    const [isValid, setIsValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const {
        token,
    } = useUserContext()

    const {
        showSnackbar,
    } = useSnackbarContext()

    useEffect(() => {
        for (const errorIndex in errors) {
            if (errors[errorIndex as keyof object]) {
                setIsValid(false)
                return
            }
        }
        setIsValid(true)
    }, [errors])

    const handleNewPassword = (newPassword: string) => {
        setFormDate(prev => ({
            ...prev,
            newPassword
        }))
        setDirtyFields(prev => ({
            ...prev,
            newPassword: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))

        const error = validatePassword(newPassword)

        setErrors(prev => ({
            ...prev,
            newPassword: error,
        }))
    }

    const handleCurrentPassword = (currentPassword: string) => {
        setFormDate(prev => ({
            ...prev,
            currentPassword
        }))
        setDirtyFields(prev => ({
            ...prev,
            currentPassword: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))

        if (!currentPassword) {
            setErrors(prev => ({
            ...prev,
                currentPassword: 'Введите текущий пароль',
            }))
        }

        setErrors(prev => ({
            ...prev,
            currentPassword: '',
        }))
    }

    const handleSubmit = async () => {
        const isSuccess = await changePassword(
            formData.newPassword,
            formData.currentPassword,
            token as string,
        )

        if (isSuccess) {
            showSnackbar('success', 'Пароль успешно изменен')
            navigate('/settings')
        } else {
            setErrors(prev => ({
                ...prev,
                afterSubmitError: 'Неверный пароль',
            }))
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
                    newPassword: dirtyFields.newPassword && errors.newPassword,
                    currentPassword: dirtyFields.currentPassword && errors.currentPassword,
                    afterSubmitError: errors.afterSubmitError, 
                }}
            />
            <PasswordField
                value={formData.newPassword}
                onChange={handleNewPassword}
                placeholder="Новый пароль"
            />
            <PasswordField
                value={formData.currentPassword}
                onChange={handleCurrentPassword}
                placeholder="Текущий пароль"
                style={{ marginTop: 32 }}
            />
            <Button
                text="Сохранить"
                isLoading={isLoading}
                disabled={!isValid}
                style={{ marginTop: 32 }}
            />
        </Form>
    )
}

export { ChangePasswordForm }
