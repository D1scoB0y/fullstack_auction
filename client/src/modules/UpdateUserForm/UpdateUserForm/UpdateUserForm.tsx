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
import TextArea from "../../../UI/TextArea/TextArea"


interface FormData {
    username: string
    email: string
    phoneNumber: string
    contacts: string
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
    contacts: boolean
}

const initialFormData = {
    username: '',
    email: '',
    phoneNumber: '',
    contacts: '',
}

const initialDirtyFields = {
    username: false,
    email: false,
    phoneNumber: false,
    contacts: false,
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
            contacts: user?.contacts || '',
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
        const isContactsOld = formData.contacts === (user?.contacts || '')

        if (isUsernameOld && isEmailOld && isPhoneNumberOld && isContactsOld) {
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

    const handleContacts = (contacts: string) => {
        setFormData(prev => ({
            ...prev,
            contacts,
        }))
        setDirtyFields(prev => ({
            ...prev,
            contacts: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))
    }

    const handleSubmit = async () => {
        const freshData = {
            username: formData.username,
            email: formData.email,
            phoneNumber: formData.phoneNumber || null,
            contacts: formData.contacts || null,
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
            <TextArea
                value={formData.contacts}
                onChange={handleContacts}
                maxLength={200}
                placeholder="Как с вами связаться в случае выигрыша?"
                style={{ marginTop: 32 }}
            />

            <Button
                text="Сохранить"
                disabled={!isValid}
                isLoading={isLoading}
                style={{marginTop: 24}}
            />

            <>{!user?.createdViaGoogle && <ChangePasswordHref />}</>
        </Form>
    )
}

export { UpdateUserForm }
