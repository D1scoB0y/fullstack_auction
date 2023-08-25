import { useState, useEffect } from 'react'

import styles from './UserDataSection.module.css'

import useUserContext from '@/context/useUserContext'
import useModalsStore from '@/stores/modalsStore'
import { checkUsername, checkEmail, checkPhone } from '@/services/userServices/checkUserDataService'
import { updateUser } from '@/services/userServices/userDataManiulationsService'
import useInput from '@/hooks/useInput'
import useFormValid from '@/hooks/useFormValid'

import Input from '@/components/UI/Form/Input/Input'
import Button from '@/components/UI/Button/Button'
import Line from '@/components/UI/Line/Line'
import HiddenErrorMessage from '@/components/UI/Form/HiddenErrorMessage/HiddenErrorMessage'


interface IAfterSubmitErrors {
    username: string
    email: string
    phoneNumber: string
}

const initialAfterSubmitErrors = {
    username: '',
    email: '',
    phoneNumber: '',
}


const UserDataSection = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [afterSubmitErrors, setAfterSubmitErrors] = useState<IAfterSubmitErrors>(initialAfterSubmitErrors)

    const username = useInput('', {required: true, minLength: 3})
    const email = useInput('', {required: true, isEmail: true})
    const phoneNumber = useInput('', {isPhoneNumber: true})


    const {
        token,
        user,
        updateUserState,
    } = useUserContext()


    const {
        setChangePasswordModalActive,
    } = useModalsStore()

    const isValid = useFormValid(
        afterSubmitErrors,
        username,
        email,
        phoneNumber
    )


    useEffect(() => {
        if (user) {
            username.setValue(user.username)
            email.setValue(user.email)
            phoneNumber.setValue(user.phoneNumber || '')
        }
    }, [user])


    useEffect(() => {

        const isUsernameOld = username.value === user?.username

        const isEmailOld = email.value === user?.email

        const isPhoneNumberOld = phoneNumber.value === (user?.phoneNumber || '')

        setIsFormValid(isValid && (!isUsernameOld || !isEmailOld || !isPhoneNumberOld))
        
    }, [
        username,
        email,
        phoneNumber,
        isValid,
    ])


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        let isSubmissionСanceled = false

        if (username.value !== user?.username && !await checkUsername(username.value)) {
            setAfterSubmitErrors(prev => ({...prev, username: 'Это имя пользователя уже занято'}))
            isSubmissionСanceled = true
        }

        if (email.value !== user?.email && !await checkEmail(email.value)) {
            setAfterSubmitErrors(prev => ({...prev, email: 'Эта почта уже занята'}))
            isSubmissionСanceled = true
        }

        if (phoneNumber.value) {

            if (phoneNumber.value !== user?.phoneNumber && !await checkPhone(phoneNumber.value)) {

                setAfterSubmitErrors(prev => ({...prev, phoneNumber: 'Этот номер телефона уже занят'}))
                isSubmissionСanceled = true
            }
        }

        
        if (!isSubmissionСanceled) {

            const freshData = {
                username: username.value,
                email: email.value,
                phoneNumber: phoneNumber.value || null,
            }

            if (token) {
                const response = await updateUser(freshData, token)

                if (!response) {
                    setAfterSubmitErrors(prev => ({...prev, password: 'Неверный пароль'}))
                }
            }

            updateUserState()
        }

        setIsLoading(false)
    }

    return (
        <form className={styles.form} onSubmit={onSubmit} noValidate>

            <span className={styles.inputLabel}>Имя пользователя</span>

            <HiddenErrorMessage errorText={username.error || afterSubmitErrors.username} />

            <Input
                value={username.value}
                onChange={
                    (value: string) => {
                        setAfterSubmitErrors(prev => ({...prev, username: ''}))
                        username.onChange(value)
                    }
                }
                maxLength={20}
            />


            <span className={styles.inputLabel}>Электронная почта</span>

            <HiddenErrorMessage errorText={email.error || afterSubmitErrors.email} />

            <Input
                value={email.value}
                onChange={
                    (value: string) => {
                        setAfterSubmitErrors(prev => ({...prev, email: ''}))
                        email.onChange(value)
                    }
                }
            />


            <span className={styles.inputLabel}>Номер телефона</span>

            <HiddenErrorMessage errorText={phoneNumber.error || afterSubmitErrors.phoneNumber} />

            <Input
                value={phoneNumber.value}
                onChange={
                    (value: string) => {
                        setAfterSubmitErrors(prev => ({...prev, phoneNumber: ''}))
                        phoneNumber.onChange(value)
                    }
                }
                maxLength={14}
                placeholder='+79999999999'
                type="tel"
            />
            

            {!user?.createdViaGoogle && (
                <span
                    className={styles.changePasswordHref}
                    onClick={() => setChangePasswordModalActive(true)}
                >
                    Изменить пароль
                </span>
            )}

            <Line />


            <Button
                text='Сохранить настройки'
                className={styles.saveChangesButton}
                isLoading={isLoading}
                disabled={!isFormValid}
                style={{marginTop: 24}}
            />

        </form>
    ) 
}


export default UserDataSection
