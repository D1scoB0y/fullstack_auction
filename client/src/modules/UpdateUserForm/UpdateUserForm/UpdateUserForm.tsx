import { useState, useEffect } from "react"
import Input from "../../../UI/Input/Input"
import Button from "../../../UI/Button/Button"
import Form from "../../../UI/Form/Form"
import ErrorBox from "../../../UI/ErrorBox/ErrorBox"
import validateEmail from "../../../validators/emailValidator"
import validateUsername from "../../../validators/usernameValidator"
import { useUserContext } from "../../../context/UserContext"
import { useSnackbarContext } from "../../../context/SnackbarContext"
import validatePhoneNumber from "../../../validators/phoneNumberValidator"
import updateUser from "../api/updateUser"
import { decodeBase64 } from "../../../helpers/decodeBase64"
import ChangePasswordHref from "../components/ChangePasswordHref/ChangePasswordHref"


interface FormData {
    username: string
    email: string
    phoneNumber: string | null
}

interface Errors {
    username: string
    email: string
    phoneNumber: string
    afterSubmitError: string
}

interface DirtyFields {
    username: boolean
    email: boolean
    phoneNumber: boolean
}

const initialFormData = {
    username: '',
    email: '',
    phoneNumber: '',
}

const initialDirtyFields = {
    username: false,
    email: false,
    phoneNumber: false,
}

const initialErrors = {
    username: '',
    email: '',
    phoneNumber: '',
    afterSubmitError: '',
}

const UpdateUserForm = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [dirtyFields, setDirtyFields] = useState<DirtyFields>(initialDirtyFields)
    const [errors, setErrors] = useState<Errors>(initialErrors)
    const [isValid, setIsValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        user,
        token,
        updateUserState,
    } = useUserContext()

    const {
        showSnackbar,
    } = useSnackbarContext()

    useEffect(() => {
        setFormData({
            username: user?.username || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
        })
    }, [user])

    useEffect(() => {
        for (const errorIndex in errors) {
            if (errors[errorIndex as keyof object]) {
                setIsValid(false)
                return
            }
        }
        setIsValid(true)
    }, [errors])

    useEffect(() => {
        const isUsernameOld = formData.username === user?.username
        const isEmailOld = formData.email === user?.email
        const isPhoneNumberOld = formData.phoneNumber === (user?.phoneNumber || '')

        if (isUsernameOld && isEmailOld && isPhoneNumberOld) {
            setIsValid(false)
            return
        }
    }, [formData])

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

    const handlePhoneNumber = (phoneNumber: string) => {
        setFormData(prev => ({
            ...prev,
            phoneNumber,
        }))
        setDirtyFields(prev => ({
            ...prev,
            phoneNumber: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))

        const error = validatePhoneNumber(phoneNumber)

        setErrors(prev => ({
            ...prev,
            phoneNumber: error,
        }))
    }

    const handleSubmit = async () => {
        const freshData = {
            username: formData.username,
            email: formData.email,
            phoneNumber: formData.phoneNumber || null,
        }

        const res = await updateUser(freshData, token as string)

        if (res.success) {
            updateUserState()
            showSnackbar('success', 'Данные успешно изменены')
        }

        setErrors(prev => ({
            ...prev,
            afterSubmitError: decodeBase64(res.errorPresentation),
        }))
    }

    return (
        <Form
            onSubmit={handleSubmit}
            setIsLoading={setIsLoading}
            style={{ marginTop: 32 }}
        >
            <ErrorBox
                errors={{
                    username: dirtyFields.username && errors.username,
                    email: dirtyFields.email && errors.email,
                    phoneNumber: dirtyFields.phoneNumber && errors.phoneNumber,
                    afterSubmitError: errors.afterSubmitError, 
                }}
            />
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
            <Input
                value={formData.phoneNumber}
                onChange={handlePhoneNumber}
                placeholder="Номер телефона"
                type="email"
                style={{marginTop: 32}}
            />
            <>{!user?.createdViaGoogle && <ChangePasswordHref />}</>
            <Button
                text="Сохранить"
                disabled={!isValid}
                isLoading={isLoading}
                style={{marginTop: 24}}
            />
        </Form>
    )
}

export { UpdateUserForm }
